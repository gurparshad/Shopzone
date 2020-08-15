import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props){
 
    const cart = useSelector(state => state.cart);
    let totalQty = 0;
    let totalPrice = 0;
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [])


    return <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                <li>
                    <h3>
                    Shopping Cart
                    </h3>
                        <div className = "price">
                            Price
                        </div>
                     </li>  
                    {
                        cartItems.length === 0 ?
                        <div>
                            Cart is empty.
                        </div> : 
                        cartItems.map(item => 
                        <div className="item-details">
                            <div className="item-image">
                            <img src={item.image} alt="product" />
                            {/* <img src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/cloud/cumulus-cloud.jpg" alt = "prod" /> */}
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/"+ item.productId}>{item.name}</Link>
                                </div>
                                <div>
                                    Qty:
                                     <select value={item.qty} onChange= {(e) => dispatch(addToCart(item.productId, e.target.value))}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    </select>
                                <button type="button" className="button" onClick={() => removeFromCartHandler(item.productId)}>
                                    Delete
                                </button>
                                </div>
                            </div>
                            <div className="item-price">
                                {item.price}
                            </div>
                        </div>)
                    }
                    </ul>
                </div>
                <div className="cart-action">
                    <h3>
                        Subtotal ( {cartItems.map(item => {
                            totalQty = totalQty + item.qty;
                            totalPrice = totalPrice + item.price;
                        }), totalQty} items ): ${totalPrice}
                    </h3>
                    <button onClick={checkoutHandler} className="checkOutbutton" disabled={cartItems.length === 0}>
                        Proceed to checkout
                    </button>
                </div>
            </div>
}

export default CartScreen;