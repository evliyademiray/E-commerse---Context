import Loading from "../components/loading";
import Card from "../components/Card";
import { useContext } from "react";
import { ProductContext } from "../context/productContext";

const MainPage = () => {
  //Context yapısına abone olma
  //Context yapısında value olarak belirlenen verilere erişim sağlarız
  const { products } = useContext(ProductContext);
  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md-4">
      {/* Veriler gelmediyse Yükleniyor göster */}
      {!products && <Loading />}
      {/* Veriler geldiysse her biri için kart bas */}
      {products?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default MainPage;
