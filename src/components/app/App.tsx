import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../base/layout";
import Main from "../page/main";
import OneBook from "../page/one_book";
import { GlobalStyles } from "./styles";
import ScrollToTop from "../ui/scroll-to-top";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/book/:idBook" element={<OneBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
