import Navbar from "../features/navbar/Navbar";
import { Link } from "react-router-dom";
import ProductList from "../features/product-list/components/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

export default Home;
