import { useState, useEffect,useRef } from 'react';
import axios from 'axios';

const Products = () => {
    const [Products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
          .get('https://localhost:4000/api/products')
          .then((response) => {
            setProducts(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, []);

    return (
        <div className="products">
            { Products.map((item, idx) => (
                <div className="product" key={idx}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                </div>
            ))
            }
        </div>
    );
}
 
export default Products;