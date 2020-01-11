import React, { useState } from "react";
import "./styles.css";
import Home from "./components/Home";
import OrderContext from "./context/OrderContext";
import { Router, Link } from "@reach/router";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";

export default function App() {
  const OrderHook = useState({
    items: [],
    user: {},
    payment: {},
    total: 0
  });
  return (
    <div className="App">
      <OrderContext.Provider value={OrderHook}>
        <div className="wrapper">
          <header className="row">
            <Link to="/">
              <img
                src="https://www.topviewnyc.com/content/distribution/assets/img/topview-new-year-logo.svg"
                alt="logo"
              />
            </Link>
            <h1>Bike Rentals</h1>
          </header>
          <Router>
            <Home path="/" />
            <Payment path="/payment" />
            <Checkout path="/checkout" />
          </Router>
        </div>
      </OrderContext.Provider>
    </div>
  );
}
