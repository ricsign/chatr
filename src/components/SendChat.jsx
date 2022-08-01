import React, { useState } from "react";

import { Input, Button } from "@mui/material";

import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db, auth } from "../serve/firebase.js";

function SendChat({ scroll }) {
  const [ chat, setChat ] = useState('')

  const sendChat = async (e) => {
    e.preventDefault()
    const { uid, photoURL, displayName } = auth.currentUser

    await addDoc(collection(db, 'chats'), {
        uid,
        photoURL,
        displayName,
        message: chat,
        sentiment: 1,
        timestamp: Timestamp.now()
    })

    setChat("")
    scroll.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <form onSubmit={sendChat}>
        <div className="sendChat">
            <Input style={{ width: '78%', fontSize: '18px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value={chat} onChange={e => setChat(e.target.value)} placeholder="Say Something..." />
            <Button style={{ width: '18%', fontSize: '18px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
        </div>
      </form>
    </>
  );
}

export default SendChat;
