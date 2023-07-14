import { useEffect, useState } from "react";
import { useUsers } from "../../api/providers/user-provider"
import { getTransactionInfo } from "../../api/transactions";
import "./transaction-info.css";

export const TransactionInfo = () => {
    const users = useUsers();
    const [info, setInfo] = useState({});
    
    useEffect(() => {
        const fetchInfo = async () => {
            const id = parseInt(users.selectedUser);
            const results = await getTransactionInfo(id);
            setInfo(results);
        }
        fetchInfo();
    }, [users.selectedUser])

    return <div data-testid="TransactionInfo">{
        Object.keys(info).map(month => <div className="TranasactionInfoMonth">
            <label className="Month">{month}</label>
            <div className="MonthData">
                <label>Spent: {info[month]?.spent}</label>
                <label>Rewards: {info[month]?.rewardPoints}</label>
            </div>
        </div>)
    }</div>
}