import { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import { useProducts } from "../../api/providers/products-provider";
import { useUsers } from "../../api/providers/user-provider";
import { getTransactionRewardPoints } from "../../api/reward-points";
import { getTransactions } from "../../api/transactions";
import { DataTable } from "../data-table/data-table";
import './user-transactions-data-table.css';

export const UserTransactionsDataTable = (props) => {
    const user = useUsers();
    const userId = parseInt(user.selectedUser);

    const [transactions, setTransactions] = useState([]);
    const [productTransactions, setProductTransactions] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const results = await getTransactions(userId);
            setTransactions(results);
        }
        fetchTransactions();
    }, [userId])
    return <DataTable datasource={transactions} columns={userTransactionsTableColumns} />
}

export const ProductCell = (props) => {
    const {value} = props;

    const {products, addProducts} = useProducts();
    const [countedProducts, setCountedProducts] = useState({})
    useEffect(() => {
        const fetchProducts = async () => {
            await addProducts(value)
        }
        fetchProducts();
    }, [value])
    useEffect(() => {
        const newCountedProducts = {};
        for (const productId of value) {
            const product = products.find(product => product.id === productId);
            if (newCountedProducts[productId]) {
                if (product) {
                    newCountedProducts[productId].loading = false;
                    newCountedProducts[productId].count++;
                    newCountedProducts[productId].name = product.name;
                } else {
                    newCountedProducts[productId].loading = true;
                    newCountedProducts[productId].count++;
                }
            } else {
                if (product) {
                    newCountedProducts[productId] = {loading: false, count: 1, name: product.name}
                } else {
                    newCountedProducts[productId] = {loading: true, count: 1}
                }
            }
        }
        setCountedProducts(newCountedProducts)
    }, [products, value])

    return (
        <div className='UserTransactionsDataTableCell'>{Object.keys(countedProducts).map(productKey => <span key={productKey}><span>{countedProducts[productKey].count}</span>&nbsp;<span>{countedProducts[productKey].name}</span></span>)}</div>
    )
}
export const RewardPointCell = (props) => {
    const {source} = props;
    const [rewardPoints, setRewardPoints] = useState(null);

    useEffect(() => {
        const fetchPoints = async () => {
            const points = await getTransactionRewardPoints(source.id);
            setRewardPoints(points);
        }
        fetchPoints()
    }, [source])

    return <>{rewardPoints ? rewardPoints.points : '...'}</>
}
const userTransactionsTableColumns = [
    {
        key: 'products',
        label: 'Products',
        Component: ProductCell
    },
    {
        key: 'date',
        label: 'Date'
    },
    {
        key: 'rewardPoints',
        label: 'Reward Points',
        Component: RewardPointCell
    },
    {
        key: 'totalPrice',
        label: 'Total Price'
    }
]