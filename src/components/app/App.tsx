import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "../base/layout";
import Main from "../page/main";
import OneBook from "../page/one_book";
import { GlobalStyles } from "./styles";
import ScrollToTop from "../ui/scroll-to-top";

const App: React.FC = () => {
  return (
    <HashRouter>

      <GlobalStyles />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/book/:idBook" element={<OneBook />} />
        </Route>
      </Routes>

    </HashRouter>
  );
}

export default App;
