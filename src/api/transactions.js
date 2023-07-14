import { transactions } from "./data/transactions"
import { priceToRewards } from "./reward-points";

export const getTransactions = async (userId) => {
    const userTransactions = [];
    for (const transaction of transactions) {
        if (transaction.user === userId) {
            userTransactions.push(transaction);
        }
    }

    return await (new Response(new Blob([JSON.stringify(userTransactions)], {type: 'application/json'}), {status: 200})).json();
}
export const getTransaction = async (id) => {
    for (const transaction of transactions) {
        if (transaction.id === id) {
            return await (new Response(new Blob([JSON.stringify(transaction)], {type: 'application/json'}), {status: 200, statusText: JSON.stringify(transaction)})).json();
        }
    }
}
export const postTransaction = async (data) => {
    const id = Math.max(...transactions.map(transaction => transaction.id)) + 1;
    const newTransaction = {
        ...data,
        id
    };
    transactions.push(newTransaction);
    return new Response(new Blob([JSON.stringify(newTransaction)], {type: 'application/json'}), {status: 200, statusText: JSON.stringify(newTransaction)})
}
export const patchTransaction = async (id, data) => {
    for (const transaction of transactions) {
        if (transaction.id === id) {
            for (const key of Object.keys(data)) {
                transaction[key] = data[key];
            }
            return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 200})).json();
        }
    }
    return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 404})).json();
}

export const getTransactionInfo = async (userId) => {
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemmber', 'Decemeber'];
    const userTransactions = transactions.filter(transaction => transaction.user === userId);
    const monthsData = {}
    for (const transaction of userTransactions) {
        const month = months[new Date(transaction.date).getMonth()];
        if (monthsData[month]) {
            monthsData[month].spent += transaction.totalPrice;
            monthsData[month].rewardPoints += priceToRewards(transaction.totalPrice)
        } else {
            monthsData[month] = {spent: transaction.totalPrice, rewardPoints: priceToRewards(transaction.totalPrice)}
        }
    }
    return await (new Response(new Blob([JSON.stringify(monthsData)], {type: 'application/json'}), {status:200})).json()
}