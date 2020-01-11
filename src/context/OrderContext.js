import { createContext } from "react";

const OrderContext = createContext({
  items: [],
  user: {},
  payment: {},
  total: 0
});

export default OrderContext;
