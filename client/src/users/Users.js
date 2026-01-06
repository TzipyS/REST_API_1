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
import UnifiedSearch from "./Search"


const Users = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([]);

    const { query } = useOutletContext();
    const [queryField, setQueryField] = useState("name");
    const [queryValue, setQueryValue] = useState("");
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
        const globalFiltered = users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            ) 
        )
        const finalFiltered = globalFiltered.filter(user =>
            user[queryField]?.toString().toLowerCase().includes(queryValue.toLowerCase())
        );

        setFilteredUsers(finalFiltered)
    }, [users, query, queryField, queryValue])
    if (users.length === 0) return <h1>Loading...</h1>

    return (
        <div className="users">
            <Button variant="outlined" component={RouterLink} to="/">
                HOME
            </Button>
            <FormDialog  onUserCreated={fetchUsers}/>

            <UnifiedSearch
                queryField={queryField}
                setQueryField={setQueryField}
                queryValue={queryValue}
                setQueryValue={setQueryValue}
            />

            {/* לחיפוש לפי שדה
            <div style={{ display: "flex", gap: "10px", margin: "15px 0", alignItems: "center" }}>
                <Autocomplete
                    value={searchFields.find(f => f.value === queryField)}
                    onChange={(event, newValue) => setQueryField(newValue?.value || "")}
                    options={searchFields}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 150 }}
                    renderInput={(params) => <TextField {...params} label="Field" />}
                />
                <TextField
                    value={queryValue}
                    onChange={(e) => setQueryValue(e.target.value)}
                    label="Search value"
                    variant="outlined"
                    size="small"
                />
            </div> */}

            {filteredUsers.map((user) => (
                <div key={user.id} className="user-item">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined" startIcon={<DeleteIcon />}
                            onClick={() => deleteUser({ id: user._id, users, setUsers })} >
                            Delete
                        </Button>
                        <UpdateUserDialog user={user} users={users} setUsers={setUsers} />
                    </Stack>
                </div>
            ))}

        </div>
    )
}
export default Users;


