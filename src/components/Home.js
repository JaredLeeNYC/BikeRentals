import React, { useState, useRef, createRef, useContext } from "react";
import { Button, Layout, Card } from "element-react";
import OrderContext from "../context/OrderContext";
import { navigate } from "@reach/router";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Adult Male Bike",
      price: 20.5,
      image: "http://via.placeholder.com/250x250?text=Adult%20Male%20Bike",
      product_type: "bike"
    },
    {
      id: 2,
      name: "Adult Female Bike",
      price: 20.5,
      image: "http://via.placeholder.com/250x250?text=Adult%20Female%20Bike",
      product_type: "bike"
    },
    {
      id: 3,
      name: "Kids Unisex Bike",
      price: 12.75,
      image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike",
      product_type: "bike"
    },
    {
      id: 4,
      name: "Adult Unisex Helmet",
      price: 4.0,
      image: "http://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet",
      product_type: "accessory"
    },
    {
      id: 5,
      name: "Kids Unisex Helmet",
      price: 3.5,
      image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet",
      product_type: "accessory"
    },
    {
      id: 6,
      name: "Insurance",
      price: 9.99,
      image: "http://via.placeholder.com/250x250?text=Insurance",
      product_type: "addon"
    }
  ]);

  const [user, setUser] = useState({
    email: "sightseeing@NYC.com",
    name: "Topview"
  });
  const numsRef = useRef([...Array(6)].map(() => createRef()));
  const [order, setOrder] = useContext(OrderContext);

  function getRows(arr) {
    const rows = [];
    for (let i = 0; i < arr.length; i++) {
      if (!rows[i]) {
        rows[i] = new Array();
        rows[Math.floor(i / 3)].push(arr[i]);
      } else {
        rows[Math.floor(i / 3)].push(arr[i]);
      }
    }
    return rows;
  }

  function viewOrder() {
    let haveBike = false;
    let itemId = 0;
    const _order = {
      items: [],
      user: {},
      payment: {},
      total: 0
    };
    for (let i = 0; i < products.length; i++) {
      if (
        products[i].product_type === "bike" &&
        numsRef.current[i].current.value >= 1
      ) {
        haveBike = true;
      }
      if (numsRef.current[i].current.value >= 1) {
        itemId++;
        _order.items.push({
          itemId: itemId,
          productId: i,
          itemName: products[i].name,
          price: products[i].price,
          quantity: numsRef.current[i].current.value
        });
        _order.user.email = user.email;
        _order.user.name = user.name;
        _order.total += products[i].price * numsRef.current[i].current.value;
      }
    }
    if (haveBike) {
      _order.total = _order.total.toFixed(2);
      setOrder(_order);
      navigate("/payment");
    } else {
      alert("at least add 1 bike product to items");
    }
  }

  const Product = props => {
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <img src={props.product.image} className="image" alt="bike1" />
        <div style={{ padding: 14 }}>
          <span>{props.product.name}</span>
          <span className="price">${props.product.price}</span>
          <div className="bottom clearfix">
            <b>{props.product.product_type}</b>

            <input ref={props.numref} defaultValue="0" readonly="readOnly" />
            <Button
              type="primary"
              onClick={() => {
                if (numsRef.current[props.num].current.value < 10) {
                  numsRef.current[props.num].current.value++;
                }
              }}
            >
              +
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (numsRef.current[props.num].current.value > 0) {
                  numsRef.current[props.num].current.value--;
                }
              }}
            >
              -
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="container">
      {getRows(products).map((row, rowIndex) => {
        return (
          <Layout.Row gutter="60">
            {row.map((product, index) => {
              return (
                <Layout.Col xs="24" sm="12" lg="8">
                  <Product
                    product={product}
                    numref={numsRef.current[rowIndex * 3 + index]}
                    num={rowIndex * 3 + index}
                  />
                </Layout.Col>
              );
            })}
          </Layout.Row>
        );
      })}

      <div className="continue">
        <Button type="primary" size="large" onClick={viewOrder}>
          View Order
        </Button>
      </div>
    </div>
  );
}
