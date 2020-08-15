import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(){
    
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [])  // [] means this hook will run when component will be made;

    return loading ? <div>Loading ...</div> :
        error ? <div>{error}</div> :
    <ul className="products">
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