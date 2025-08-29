import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 0;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExist >= 0) {
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }

        saveLocalStorage();
        console.log("adding to cart", item);
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
        console.log("removing item", id);
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        })
        setCart(updatedCart);
        console.log("increasing quantity for item", id);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([])
    }

    function saveLocalStorage() {
        localStorage.setItem('cart', cart)
    }

    const isEmpty = useMemo(() => cart.length === 0);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0),
        [cart]);
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        clearCart,
        decreaseQuantity,
        isEmpty,
        cartTotal
    };

}

export default useCart;