import React, { useState, useEffect } from "react";

import { Input, Button } from "@mui/material";

import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db, auth } from "../serve/firebase.js"

import * as toxicity from "@tensorflow-models/toxicity";
// import { setdiff1dAsync } from "@tensorflow/tfjs";

function SendChat({ scroll }) {
  const [ chat, setChat ] = useState('')
  const [ model, setModel ] = useState(null)

  const sendChat = async (e) => {
    e.preventDefault()
    let healthiness = 10000
    const { uid, photoURL, displayName } = auth.currentUser

    // check for healthiness when send chat (onChange is way too slow)
    // prediction is an array with 6 fields (exclude the last field), healthiness = 0-1 in the end
    const predictions = await model.classify(chat)

    for(let i=0;i<predictions.length-1;i++) {
      healthiness -= Math.round(parseFloat(predictions[i].results[0].probabilities[1])*9000)
    }
    healthiness /= 10000;
    healthiness -= (Math.floor(Math.random() * 5))/100
    if(healthiness < 0) healthiness = (Math.floor(Math.random() * 5))/100
    if(healthiness < 0.1) alert("Please be advised that your comment may subject to further toxicity detection.")
  
    
    console.log(healthiness)
    await addDoc(collection(db, 'chats'), {
        uid,
        photoURL,
        displayName,
        message: chat,
        healthiness,
        timestamp: Timestamp.now()
    })

    setChat("")
    scroll.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const loadModel = async () => {
      console.log("Please be patient as the model is loading...");
      const threshold = 0.9;
      const m = await toxicity.load(threshold);
      setModel(m);
      console.log("The model has been successfully loaded.");
    };
    loadModel();
  },  [])

  return (
    <>
      <form onSubmit={sendChat}>
        <div className="sendChat">
            {model ? 
              <Input style={{ width: '78%', fontSize: '18px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value={chat} onChange={e => setChat(e.target.value)} placeholder="Say Something..." /> :
              <Input style={{ width: '78%', fontSize: '18px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value={chat} onChange={e => setChat(e.target.value)} placeholder="Please wait as the model is loading..." disabled /> 
            }
            <Button style={{ width: '18%', fontSize: '18px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
        </div>
      </form>
    </>
  );
}

export default SendChat;
