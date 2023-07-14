import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "../products";

const productsContext = createContext({products: [], addProducts: (productIds) => []})

export const ProductsProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [queue, setQueue] = useState([]);
    const addProducts = async (productIds) => {
        setQueue(queue => [...queue, ...productIds.map(id => queue.includes(id) ? null : id).filter(id => id !== null)])
    }

    useEffect(() => {
        const fetchNextQueue = async () => {
            const productPromises = [];
            for (const productId of queue) {
                productPromises.push(getProduct(productId))
            }
            const productsResults = await Promise.all(productPromises);
            setProducts(products => [...products, ...productsResults]);
            setQueue([]);
        }
        if (queue.length > 0) {
            fetchNextQueue();
        }
    }, [queue])

    return <productsContext.Provider value={{products, addProducts}}>
        {props.children}
    </productsContext.Provider>
}

export const useProducts = () => ({...useContext(productsContext)});