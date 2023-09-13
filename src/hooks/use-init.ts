import { useEffect } from 'react';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере, изменении depends,
 * переходе между страницами и обновлении.
 * @param load Пользовательская функция
 * @param depends Значения при смене которых callback снова исполнится.
 */
export default function useInit(load: (arg?: any) => void, depends = []) {
  useEffect(() => {
    load();
    console.log("init")
    // Подписка на события
    // window.addEventListener('load', load);
    window.addEventListener('popstate', load);
    return () => {
      // Отписка от события
      // window.removeEventListener('load', load);
      window.removeEventListener('popstate', load);
    };
  }, depends);
}
