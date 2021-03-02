import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import "./Chat.css";
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
       if(roomId) {
           
            // This is to change the chat-header-info-name
           db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ))
           
           // This is to change the message field
           db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data())) 
            );           
       }
    }, [roomId])   // [roomId]=> means each time the roomId changes

    // This is to generate a random number for our avatar
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    //for sending message
    const sendMessage = (e) => {
        e.preventDefault();  // if we press enter it will stop it from refreshing
        console.log("You typed >>> ", input);
        
        //for sending the messages
        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        
        setInput("");  //it will clear the input box after everytime we press the enter button
    };

    
    return (
        <div className = "chat">
            <div className = "chat__header">
            <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {/* to show the last message timestamp after last seen */}
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className = "chat__body">
            
                {messages.map((message) => (
                    
                    <p className = {`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className = "chat__name">
                            {message.name}
                        </span>

                        {message.message}

                        <span className = "chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>                    

                ))} 

            </div>

            <div className = "chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                    value = {input} 
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder = "Type a message" type = "text" />
                    <button onClick = {sendMessage} type = "submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
