import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    // for messages
    useEffect(() => {
        if (id) {
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            );
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    // when we click the "Add new Chat" button then it will create a chat
    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName) {
            // will push the new chat in rooms database
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    // in return statement if it doesn't has addNewChat then it will render another div
    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
            <div className = "sidebarChat">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className = "sidebarChat__info">
                    <h2>{name}</h2>
                    {/* to keep the newest chat in order */}
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick = {createChat} className = "sidebarChat">
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat;



// 'https://avatars.dicebear.com/api/human/hdsuifh.svg'  
// ==> it's an API ,by which we can create random human avatar by just writing any random things and then ".svg" ...