import React, { useState, useEffect, useRef } from 'react'

import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../serve/firebase'

import SignOut from './SignOut'
import SendChat from './SendChat'
import Chat from './Chat'

function Chats() {
    const [ chats, setChats ] = useState([])
    const scroll = useRef()

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('timestamp'), limit(50)) // collection(db, 'chat') is a document ref, query() also outputs a document ref

        // onSnapshot for realtime update (use getDocs for non-realtime)
        onSnapshot(q, (snapshot) => {
            setChats(snapshot.docs.map(doc => doc.data()))
        })

    }, [])

    return (
        <>
            <SignOut />

            <div className="chats">
                {chats.map((chat) => (
                    <Chat chat={chat} />
                ))}
            </div>

            <SendChat scroll={scroll} />
            <div ref={scroll}></div>
        </>
    )
}

export default Chats