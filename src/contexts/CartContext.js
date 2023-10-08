// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [itemAmount, setItemAmount] = useState(0);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const total = cart.reduce((accumulator, currentItem) => {
//       return accumulator + currentItem.pageCount * currentItem.amount;
//     }, 0);
//     setTotal(total);
//   });

//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((accumulator, currentItem) => {
//         return accumulator + currentItem.amount;
//       }, 0);
//       setItemAmount(amount);
//     }
//   }, [cart]);

//   const addToCart = (product, id) => {
//     const newItem = { ...product, amount: 1 };
//     const cartItem = cart.find((item) => {
//       return item._id === id;
//     });
//     if (cartItem) {
//       const newCart = [...cart].map((item) => {
//         if (item._id === id) {
//           return { ...item, amount: cartItem.amount + 1 };
//         } else return item;
//       });
//       setCart(newCart);
//     } else {
//       setCart([...cart, newItem]);
//     }
//   };

//   const removeFromCart = (id) => {
//     const newCart = cart.filter((item) => {
//       return item._id !== id;
//     });
//     setCart(newCart);
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const increaseAmount = (id) => {
//     const cartItem = cart.find((item) => item._id === id);
//     addToCart(cartItem, id);
//   };

//   const decreaseAmount = (id) => {
//     const cartItem = cart.find((item) => item._id === id);
//     if (cartItem) {
//       const newCart = cart.map((item) => {
//         if (item._id === id) {
//           return { ...item, amount: cartItem.amount - 1 };
//         } else {
//           return item;
//         }
//       });
//       setCart(newCart);
//     }
//     if (cartItem.amount < 2) {
//       removeFromCart(id);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseAmount,
//         decreaseAmount,
//         itemAmount,
//         total,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;





import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => Promise,
  itemAmount: 0,
  setItemAmount: () => Promise,
  total: 0,
  setTotal: () => Promise,
  isOpen : Boolean,
  setIsOpen : () => Promise,
  handleClose : () => null,
})

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.pageCount * currentItem.amount;
    }, 0);
    setTotal(total);
  });

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item._id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item._id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item._id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item._id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  const handleClose = () => {
    setIsOpen(false)
  }


  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    total,
    isOpen,
    setIsOpen,
    handleClose,
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};
