import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './Sidebar.css';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch ] = useStateValue();

    // go to the database collection named rooms (from firebase firestore) and use snapshot for any changes
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>       
            setRooms(
                //after snapshot go through every documents(docs) and create two objects named id and data.
                snapshot.docs.map((doc) => ({ 
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscribe();
        };

    }, []);

    return (
        <div className = "sidebar">
            <div className = "sidebar__header">
                <Avatar src = {user?.photoURL} />
                <div className = "sidebar__headerRight">
                    {/* for status icon */}
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                          
                    {/* for chat icon */}
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    
                    {/* for more icon */}
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>

            <div className = "sidebar__search">
                <div className = "sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder = "Search or start new chat" type = "text" />
                </div>                
            </div>
        
            <div className = "sidebar__chats">
    
                <SidebarChat addNewChat />

                {/* map through every data of the array rooms and modify the component SidebarChat */}
                {rooms.map((room) => (
                    <SidebarChat key = {room.id} id = {room.id} name = {room.data.name}  />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
