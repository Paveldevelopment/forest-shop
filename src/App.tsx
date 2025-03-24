import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProductListPage from "./pages/ProductList/ProductListPage";
import ProductEditPage from "./pages/ProductEdit/ProductEditPage";
import CreateProductPage from "./pages/CreateProduct/CreateProductPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/edit" element={<ProductEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
