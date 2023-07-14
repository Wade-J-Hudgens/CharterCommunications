import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../users";

const userContext = createContext({users: [], selectedUser: null, setSelectedUser: (selectedUSer) => {}});

export const UserProvider = (props) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(1)
    useEffect(() => {
        const fetchUsers = async () => {
            const results = await getUsers();
            setUsers(results);
            setSelectedUser(results[0].id)
        }
        fetchUsers();
    }, [])

    return <userContext.Provider value={{users, selectedUser, setSelectedUser}}>
        {props.children}
    </userContext.Provider>
}
export const useUsers = () => ({...useContext(userContext)})