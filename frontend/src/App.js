import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/productScreen';

function App() {

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

  return (
      <BrowserRouter>
    <div className="App">
      <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        {/* <!-- ascci code for the hamburger button --> */}
                        &#9776; 
                    </button>
                    <Link to="/">shopzone</Link>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Cart</a>
                        <a href="signin.html">Signin</a>
                    </div>
                
            </header>
            <aside className="sidebar">
               <h3>Shopping Categories</h3> 
               <button className="sidebar-close-btn" onClick={closeMenu}>x</button>
               <ul className="categories-list">
                   <li>
                       <a href="pants.html">Pants</a>
                   </li>
                   <li>
                    <a href="shirts.html">Shirts</a>
                    </li>
               </ul>
            </aside>
            <main className="main">
                <div className="content">
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                </div>

            </main>
            <footer className="footer">
                All rights reserved.
            </footer>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
