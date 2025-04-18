import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id 
                        ? { 
                            ...item, 
                            quantity: item.quantity + 1,
                            price: parseFloat(item.price) || 0
                          } 
                        : item
                );
            }
            return [
                ...prevItems, 
                { 
                    ...product, 
                    quantity: 1,
                    price: parseFloat(product.price) || 0
                }
            ];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => 
                item.id === id 
                    ? { ...item, quantity: Math.max(1, quantity) } 
                    : item
            )
        );
    };

    const checkout = (paymentMethod, tip) => {
        const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    
        const newOrder = {
            items: [...cartItems],
            orderNumber,
            paymentMethod,
            tip: parseFloat(tip) || 0,
            date: new Date().toISOString()
        };
    
        const user = JSON.parse(localStorage.getItem("userProfile"));
        const userEmail = user?.email || "guest";

        const key = `orderHistory_${userEmail}`;
        const existingHistory = JSON.parse(localStorage.getItem(key)) || [];
        localStorage.setItem(key, JSON.stringify([...existingHistory, newOrder]));
    
        setConfirmedOrder(newOrder);
        setCartItems([]);
    };
    

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                checkout,
                confirmedOrder // Add this to provider
            }}
        >
            {children}
        </CartContext.Provider>
    );
}