import { useEffect, useState } from "react";
import { fetchUser as apifetchUser } from "./ApiUsers";
import FormDialog from "./createUser";
import deleteUser from "./DeleteUser";
import Button from '@mui/material/Button';
import UpdateUserDialog from "./UpdateUser"
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useOutletContext } from "react-router-dom";






const Users = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { query } = useOutletContext();
    const fetchUsers = async () => {
        try {
            const { data } = await apifetchUser();
            setUsers(data)
            setFilteredUsers(data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (!users) return
        const filtred = users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        )
        setFilteredUsers(filtred)
    }, [query, users])
    if (users.length === 0) return <h1>Loading...</h1>

    return (
        <div className="users">
            <Button variant="outlined"component={RouterLink}to="/">
                HOME
            </Button>
            <FormDialog />
            {filteredUsers.map((user) => (
                <div key={user.id} className="user-item">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <Button
                        variant="outlined" startIcon={<DeleteIcon />}
                        onClick={() => deleteUser({ id: user._id, users, setUsers })} >
                        Delete
                    </Button>
                    <UpdateUserDialog user={user} users={users} setUsers={setUsers} />
                </div>
            ))}

        </div>
    )
}
export default Users;


