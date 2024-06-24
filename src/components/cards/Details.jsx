import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosConfig } from "../../assets/axios/axiosConfig";
import {FaStar} from 'react-icons/fa'

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axiosConfig({
        url: `/products`,
        method: "GET",
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching Products:", error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(productId)) 
      setProduct(foundProduct)
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, products])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <h1>Product Not Found...</h1>
  }

  return (
    <div className="details--container">
      <h1>Product Details</h1>
      <div className="product-details">
        <div className="product-img">
          <img src={product.image}></img>
        </div>
        <div className="product-desc">
          <h2>{product.title}</h2>
          <h3 className="category">Category : {product.category}</h3>
          <p className="desc">{product.description}</p>
          <div className="price-rate">
            <span>{product.price} $</span>
            <span><FaStar /> {product.rating.rate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;