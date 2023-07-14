import { useUsers } from "../../api/providers/user-provider"
import "./user-select.css"

export const UserSelect = () => {
    const users = useUsers();
    return <div>{
        users.users.map(user => <UserRadio key={user.id} id={user.id} />)
    }</div>
}
const UserRadio = (props) => {
    const {id} = props;
    const users = useUsers();
    const user = users.users.find(user => user.id === id)
    return <div className="UserRadio"><label>{user.name}</label><input type={"radio"} value={`${id}`} checked={users.selectedUser?.toString() === id?.toString()} onChange={e => users.setSelectedUser(e.target.value)} /></div>
}