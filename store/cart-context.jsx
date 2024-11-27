import React, { useState } from "react";
// var value = 0;
const CartContext = React.createContext({
  cartValue: 0,
  onAddToCart: () => {},
  productsAdded: null,
  cartStateHandler: (state) => {},
  cartState: false,
  // onCloseModal: () => {},
});
let products = [];
export const CartContextProvider = (props) => {
  // const [products, setProducts] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [value, setValue] = useState(0);

  const addToCartHandler = (title, price, id, image) => {
    // value += 1;
    setValue(() => value + 1);
    let quantity = 0;
    let productAdded = {
      id: id,
      image: image,
      title: title,
      price: price,
      quantity: 0,
    };
    if (products.length) {
      let turthOrFalse = false;
      for (let i = 0; i < products.length; i++) {
        if (productAdded.id === products[i].id) {
          turthOrFalse = true;
          products[i].quantity = products[i].quantity + 1;
          products[i].price = products[i].price + productAdded.price;
        }
      }
      if (!turthOrFalse) {
        productAdded.quantity++;
        products.push(productAdded);
      }
    }

    if (products.length === 0) {
      productAdded.quantity++;
      products.push(productAdded);
    }
    console.log(products);
  };

  const cartStateHandler = (state) => {
    setCartState(state);
    console.log(cartState);
  };
  const onCloseModal = (state) => {
    setCartState(state);
  };
  const cartContextValue = {
    cartValue: value,
    onAddToCart: addToCartHandler,
    productsAdded: products,
    cartStateHandler: cartStateHandler,
    cartState: cartState,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
