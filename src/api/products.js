import { products } from "./data/products"

export const getProduct = async (id) => {
    const product = products.find(product => product.id === id);
    if (product) {
        return await (new Response(new Blob([JSON.stringify(product)], {type: 'application/json'}), {status: 200})).json();
    }
    return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 404})).json();
}