import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

// array constructor is used   // 
//  for information visit the link
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array


function ProductScreen(props){
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    console.log('<<<<');
    console.log(productDetails);
    console.log('>>>>');
    // console.log(productDetails.products);
    const { products, loading, error } = productDetails;
    console.log('product details');
    console.log(products);
    if(products){
        console.log(products.brand);
        console.log('new array');
        // console.log(...Array(products.countInStock).keys());
    }
        
    // console.log(`product name ${products.name}`);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    }, []) // [] means this hook will run after rendering the data.

    const handleAddToCart = () => {
        // method to direct the user to another url.
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }

    return (
    <div>

        <div className="ResultsLink">
        <Link to="/">{"<< Go back to results"}</Link>
        </div>
        { loading ? <div>Loading...</div> : 
        products ? <div className="details">
        <div className="details-image">
            <img src={products.image} alt="product"/>
        </div>
        <div className="details-info">
            <ul>
                <li> 
                    <h4>{products.name}</h4>
                </li>
                <li>
                    {products.rating} Stars ({products.numReviews} Reviews)
                </li>
                <li>
                Price: <b>$ {products.price}</b>
                </li>
                <li>
                    Description:
                    <div>
                        {products.description}
                    </div>
                </li>
            </ul>
        </div>

        <div className="details-action">
            <ul>
                <li>
                    Price: {products.price}
                </li>
                <li>
                    Status: {products.countInStock > 0 ? "Available" : "Out of stock" }
                </li>
                <li>
                {/* array constructor used */}
                    Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                            {[...Array(products.countInStock).keys()].map(x => 
                            <option value={x+1}>{x+1}</option>)
                            }
                    </select>
                </li>
                <li> {products.countInStock > 0 ? <button onClick = {handleAddToCart} className="button">Add to Cart</button> :
                <div></div> }
                    
                </li>
            </ul>
        </div>
        </div> : "error"
         }
        
    </div>
    )
}

export default ProductScreen;