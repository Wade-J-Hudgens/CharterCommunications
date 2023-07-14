import { products } from "./products";
import { users } from "./users"
const randomDate = (date1, date2) => {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1))
    } else{
        return new Date(randomValueBetween(date1, date2))
    }
}
const generateTransactions = (minItemsPerTransaction, maxItemsPerTransaction, numTransactions) => {
    const transactions = [];
    for (const user of users) {
        for (let i = 0; i < numTransactions; i++) {
            // random transaction date
            const transactionDate = randomDate(new Date('2023/04/14'), new Date('2023/07/14'))
            // random number of products
            const numProducts = Math.floor(Math.random() * (maxItemsPerTransaction - minItemsPerTransaction + 1) + minItemsPerTransaction)
            const transactionProducts = [];

            for (let j = 0; j < numProducts; j++) {
                // random products
                const product = products[Math.floor(Math.random() * products.length)]
                transactionProducts.push(product.id);
            }

            transactions.push({
                id: transactions.length + 1,
                products: transactionProducts,
                user: user.id,
                date: transactionDate.toDateString(),
                totalPrice: transactionProducts.map(transactionProducts => products.find(product => product.id === transactionProducts).price).reduce((sum, a) => sum + a, 0)
            })
        }
    }
    return transactions;
}

export const transactions = generateTransactions(14, 31, 50);