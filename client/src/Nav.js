import { Outlet, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TaskIcon from '@mui/icons-material/Task';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import PeopleIcon from '@mui/icons-material/People';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useState } from "react";
import TextField from '@mui/material/TextField';


const drawerWidth = 200;

export default function Nav() {
    const [query, setQuery] = useState("");


    const itemsList = [
        {
            text: "Todos",
            icon: <TaskIcon />,
            to: "/todos" // <-- add link targets
        },
        {
            text: "Posts",
            icon: <FeedIcon />,
            to: "/posts"
        },
        {
            text: "Users",
            icon: <PeopleIcon />,
            to: "/users" // <-- add link targets
        },
        {
            text: "Photos",
            icon: <PhotoLibraryIcon />,
            to: "/photos"
        }
    ];

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography
                        variant="h6" noWrap component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center', // מיישר אנכית
                            width: '100%',
                        }}
                    >
                        TzipyS App

                        <TextField
                            sx={{ display: 'flex',color: '#1976d2', backgroundColor: 'white',borderRadius: 1,borderColor: '#1976d2'}}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            size="small"
                            placeholder="Search..."
                            variant="outlined"
                        />
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: "1px solid #e0e0e0",
                    },
                }}
            >
                <Toolbar />

                <Box sx={{ overflow: 'auto' }} >

                    <List>
                        {itemsList.map((item, index) => (
                            <ListItem disablePadding key={item.text}>
                                <ListItemButton
                                    component={Link}
                                    to={item.to}
                                    sx={{
                                        borderRadius: 1,
                                        mx: 1,
                                        my: 0.5,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.04)',
                                        },
                                    }}
                                >

                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: "64px" }} >
                <Outlet context={{ query }} />
                {/* <Outlet /> */}
            </Box>
        </Box>
    );
}




