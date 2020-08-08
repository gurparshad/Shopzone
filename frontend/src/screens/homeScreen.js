import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen(props){

    const [products, setProducts] = useState([]); // default value is empty array.

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("/api/products"); // destructured data
            console.log(data);
            setProducts(data);
        }
        fetchData();
    }, [])  // [] means this hook will run on "componentdidmount";

    return <ul className="products">
    {
        products.map(function(item){
            console.log(item);
            console.log(item.image);
            return(
                <li className="product" key={item._id}>
                <Link to={'/product/'+ item._id}>
                    <img className="product-image" src={item.image} alt="shirt 1"/>
                </Link>
           
            <div className="product-name">
                <Link to={'/product/'+ item._id}>{item.name}</Link>
            </div>
            <div className="product-brand">{item.brand}</div>
            <div className="product-price">{item.price}</div>
            <div className="product-ratings">{item.rating} stars {item.numReviews} Reviews</div>
        </li>
            )
            
        })
        
    }

    </ul>
}

export default HomeScreen;