import { createContext, useState } from "react";

export const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  //ürünü parametre olarak alır ve sepet state'ine ekler.
  const addToBasket = (product) => {
    //Sepette bu üründen var mı kontrol etme
    const found = basket.find((i) => i.id === product.id);

    if (found) {
      //Sepette bulunduysa 1 arttır.
      const updated = { ...found, amount: found.amount + 1 };

      //Sepet dizisinden eski elemanı çıkar yenisini ekle
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );
      //state'i güncelle
      setBasket(newBasket);
    } else {
      //Sepette yoksa ürünü ekle miktarı 1e eşitle
      setBasket([...basket, { ...product, amount: 1 }]);
    }
  };
  console.log(basket);

  const removeFromBasket = (delete_id) => {
    //sepette ürünü bul
    const found = basket.find((i) => i.id == delete_id);
    if (found.amount > 1) {
      //miktarı 1 azalt

      const updated = { ...found, amount: found.amount - 1 };

      //Sepet dizisinden eski elemanı çıkar yenisini ekle
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );
      setBasket(newBasket)
    } else {
      //sepetten kaldırma
     const filtred = basket.filter((i)=>i.id !==delete_id);
     setBasket(filtred);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
