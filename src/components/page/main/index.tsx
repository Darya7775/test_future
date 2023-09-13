import React, { memo, useCallback, useState } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import useInit from "../../../hooks/use-init";
import { OneBook } from "../../../slices_redux/types";
import { fetchBooksSearch, initParams, setParams, resetParams, setLastItems } from "../../../slices_redux/books_slice";
import store from "../../../store";
import { categoriesList, sortList } from "../../../assets/data/filters_lists";
import Select from "../../blocks/select";
import BooksList from "../../blocks/list";
import Spinner from "../../ui/spinner";
import Input from "../../ui/input";
import Form from "../../blocks/form";
import Wrapper from "../../blocks/wrapper_no_container";
import Count from "../../blocks/count";
import Button from "../../ui/button";
import WrapperBaseCon from "../../blocks/wrapper_base_container";

const Main: React.FC = () => {
  const state = store;
  const dispatch = useAppDispatch();
  // для Load More
  // Индекс последнего элемента, с которого начинать закружать
  const [ indexLastItem, setIndexLastItem ] = useState(29);
  // Индекс последнего загруженного массива с книгами в массиве в store
  const [ index, setIndex ] = useState(0);
  // Массив с массивами книг
  const [ arr, setArr ] = useState<OneBook[][]>([]);

  const sort = useAppSelector(state => state.books.params.orderBy);
  const category = useAppSelector(state => state.books.params.subject);
  const totalItems = useAppSelector(state => state.books.totalItems);
  const status = useAppSelector(state => state.books.status);
  const error = useAppSelector(state => state.books.error);
  const q = useAppSelector(state => state.books.params.q);
  // Сброс внутренних стейтов
  const resetStatesInside = () => {
    setIndex(0);
    setIndexLastItem(29);
  };
  // Обработчик для отправки запроса и установки нового массива книг
  const handler = async (replaceHistory: boolean, isLoadMore?: boolean) => {
    await dispatch(fetchBooksSearch({replaceHistory: replaceHistory, isLoadMore: isLoadMore ? isLoadMore : undefined}));
    const books = state.getState().books.books[index];
    setArr(prev => [...prev, books]);
    setIndex(index + 1);
  };

  useInit(async() => {
    console.log("Load")
    resetStatesInside();
    setArr([]);
    dispatch(initParams());
    await handler(true);
  }, []);

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort: string) => {
      dispatch(setParams({param: "orderBy", value: sort }));
      resetStatesInside();
    }, [sort]),
    // Поиск
    onSearch: useCallback((q: string) => {
      dispatch(setParams({param: "q", value: q }));
      resetStatesInside();
    }, []),
    // Сброс
    onReset: useCallback(() => {
      dispatch(resetParams());
      resetStatesInside();
    }, []),
    // Фильтр по категории
    onCategory: useCallback((category: string) => {
      dispatch(setParams({param: "subject", value: category }));
      resetStatesInside();
    }, [category]),
    // Отправка формы
    onSubmit: useCallback(async(e: React.SyntheticEvent) => {
      e.preventDefault();
      setArr([]);
      dispatch(setLastItems(0));
      await handler(false);
    }, []),
    // Загрузка еще данных
    onLoadMore: async () => {
      dispatch(setLastItems(indexLastItem));
      await handler(true, true);
      setIndexLastItem(indexLastItem + 30);
    }
  };
  // Опции фильтров
  const options = {
    categories: categoriesList,
    sort: sortList,
  };

  let content;
  if(status === "loading") {
    content = <Spinner text="Loading..." />
  } else if(status === "succeeded") {
    content = totalItems <= indexLastItem
                ? null
                : <WrapperBaseCon><Button type="button" onClick={callbacks.onLoadMore}>Load more</Button></WrapperBaseCon>;
  } else if(status === "failed") {
    content = <div>{error}</div>
  }

  return (
    <main>
      <Form textButton="Search" onSubmit={callbacks.onSubmit} onReset={callbacks.onReset}>
        <>
          <Input type="search" text="search" value={q} onChange={callbacks.onSearch}/>
          <Wrapper>
            <>
            <Select options={options.sort} value={sort} onChange={callbacks.onSort} />
            <Select options={options.categories} value={category} onChange={callbacks.onCategory} />
            </>
          </Wrapper>
        </>
      </Form>
      <Count count={totalItems}/>
      {error
        ? null
        : arr.map((books, index) => <BooksList key={index} books={books} link="/book/" />)
      }
      {content}
    </main>
  );
};

export default memo(Main);
