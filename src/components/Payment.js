import React, { useContext, useState } from "react";
import OrderContext from "../context/OrderContext";
import { Card, Button, Input } from "element-react";
import { navigate } from "@reach/router";

export default function Payment() {
  const [order, setOrder] = useContext(OrderContext);
  const [account, setAccount] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  return (
    <div>
      <Card
        className="box-card items"
        header={
          <div className="clearfix">
            <span style={{ lineHeight: "36px" }}>
              Items({order.items.length})
            </span>
          </div>
        }
      >
        {order.items.map(item => {
          return (
            <div className="text-item">
              {/* <span>
                <b>Item ID: </b>
                {item.itemId}
              </span> */}
              <span>
                {/* <b>Product: </b> */}
                {item.itemName}
              </span>
              <span>
                <b>Price: </b>${item.price}
              </span>
              <span>
                <b>Quantity: </b>
                {item.quantity}
              </span>
            </div>
          );
        })}
      </Card>
      <div className="total">
        <h3>Total: ${order.total}</h3>
      </div>

      <div className="user">
        <h3>Customer: {order.user.name}</h3>
        <h3>Email: {order.user.email}</h3>
      </div>

      <div className="payment" />
      <h3>Payment Information</h3>
      <div className="payment-row">
        Credit Card Number
        <Input
          size="small"
          placeholder="ex. 5105 1051 5015 5005"
          onChange={event => {
            setAccount(event);
          }}
        />
      </div>

      <div className="payment-row">
        Exp. Date{" "}
        <Input
          placeholder="ex. 06/83"
          onChange={event => {
            setExp(event);
          }}
        />
      </div>

      <div className="payment-row">
        CVV{" "}
        <Input
          placeholder="ex. 123"
          onChange={event => {
            setCvv(event);
          }}
        />
      </div>

      <div className="payment-row">
        Zip Code{" "}
        <Input
          placeholder="ex. 11204"
          onChange={event => {
            setZip(event);
          }}
        />
      </div>
      <div className="continue">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            if (account === "" || exp === "" || cvv === "" || zip === "") {
              alert("payment information can't be empty");
            } else {
              navigate("/checkout");
            }
          }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
