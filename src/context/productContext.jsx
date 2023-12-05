import { createContext, useState, useEffect } from "react";
import axios from "axios";
/*
*Context API
Uygulamada birden çok bileşenin ihtiyacı olan verileri
Bileşenlerde bağımsız bir şekilde konumlanan merkezlerde 
yönetmeye yarar.Verileri ve verileri değiştirmeye yarayan fonksiyonları 
tutarız.
Context, tuttuğumuz bu değişkenleri bileşenlere doğrudan aktarım yapabilen
merkezi State yönetim aracıdır.
*/
//!Context yapısının temelini oluşturma
export const ProductContext = createContext();

//! Sağlayıcı ve onun tuttuğu verileri tanımlama
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory)
  useEffect(() => {
    //kategori yoksa atacağı istek linki
    //https://fakestoreapi.com/products
    //kategori varsa atacağı istek linki
    //https://fakestoreapi.com/products/category/jewerely
    axios
      .get(
        `https://fakestoreapi.com/products${
          selectedCategory ? "/category/" + selectedCategory : ""
        }`
      )
      .then((res) => setProducts(res.data));
  }, [selectedCategory]);
  //Context yapısında tuttuğumuz veriler bileşenlere sağlar
  return (
    <ProductContext.Provider value={{ products, setSelectedCategory }}>
      {children}
    </ProductContext.Provider>
  );
}