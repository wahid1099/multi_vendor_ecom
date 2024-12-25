import { useParams } from "react-router-dom";

const ShopPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default ShopPage;
