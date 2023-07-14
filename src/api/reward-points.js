import { products } from "./data/products";
import { transactions } from "./data/transactions"

export const priceToRewards = (price) => {
    let roundedPrice = Math.floor(price);
    return Math.max(0, roundedPrice-100) + Math.max(0, roundedPrice-50);
}
export const getTransactionRewardPoints = async (transactionId) => {
    for (const transaction of transactions) {
        if (transaction.id === transactionId) {
            return await (new Response(new Blob([JSON.stringify({transactionId, points: priceToRewards(transaction.totalPrice)})], {type: 'application/json'}), {status: 200})).json()
        }
    }
}
export const getTotalRewardPoints = async (userId) => {
    const userTransactions = transactions.filter(transaction => transaction.user === userId);
    const totalPoints = userTransactions.map(transaction => {
        return priceToRewards(transaction.totalPrice)
    }).reduce((sum, a) => sum + a, 0)
    return await (new Response(new Blob([JSON.stringify({userId, points: totalPoints})], {type: 'application/json'}), {status:200})).json()
}