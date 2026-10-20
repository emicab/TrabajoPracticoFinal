import { useState } from "react";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import Footer from "./pages/Footer";
import { Route, Routes } from "react-router-dom";
import Productos from "./pages/Productos";
import PageProduct from "./pages/PageProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<PageProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
