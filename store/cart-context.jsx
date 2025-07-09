import React, { useState } from "react";

const CartContext = React.createContext({
  cartValue: 0,
  onAddToCart: () => {},
  productsAdded: null,
  cartStateHandler: (state) => {},
  cartState: false,
  onRemoveFromCart: () => {},
});
let products = [];
export const CartContextProvider = (props) => {
  const [cartState, setCartState] = useState(false);
  const [value, setValue] = useState(0);
  const [cartError, setCartError] = useState("");

  const addToCartHandler = (title, price, id, image) => {
    setCartError("");
    setValue((prev) => prev + 1);
    let productAdded = {
      id: id,
      image: image,
      title: title,
      price: price, // price per unit
      quantity: 0,
    };
    if (products.length) {
      let found = false;
      for (let i = 0; i < products.length; i++) {
        if (productAdded.id === products[i].id) {
          found = true;
          products[i].quantity = products[i].quantity + 1;
        }
      }
      if (!found) {
        productAdded.quantity = 1;
        products.push(productAdded);
      }
    } else {
      productAdded.quantity = 1;
      products.push(productAdded);
    }
    console.log(products);
  };

  const removeFromCartHandler = (id) => {
    setCartError("");
    let found = false;
    for (let i = 0; i < products.length; i++) {
      if (id === products[i].id) {
        found = true;
        if (products[i].quantity > 0) {
          products[i].quantity = products[i].quantity - 1;
          setValue((prev) => (prev > 0 ? prev - 1 : 0));
        } else {
          setCartError("Cannot remove item with zero quantity.");
        }
      }
    }
    products = products.filter((product) => product.quantity > 0);
    if (!found) {
      setCartError("Item not found in cart.");
    }
    console.log(products);
  };

  const cartStateHandler = (state) => {
    setCartState(state);
    console.log(cartState);
  };
  
  const resetCartHandler = () => {
    products = [];
    setValue(0);
  };

  const cartContextValue = {
    cartValue: value,
    onAddToCart: addToCartHandler,
    productsAdded: products,
    cartStateHandler: cartStateHandler,
    cartState: cartState,
    onRemoveFromCart: removeFromCartHandler,
    cartError,
    resetCart: resetCartHandler,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
