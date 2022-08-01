import React, { useState, useEffect, useRef } from 'react'

import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../serve/firebase'

import SignOut from './SignOut'
import SendChat from './SendChat'

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
            
            <div>Chats</div>

            <div className="chats">
                {chats.map(({ id, uid, photoURL, displayName, message }) => (
                    <div>
                        <div key={ Math.random().toString() + id + Math.random().toString() } className={`chat ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <div>
                                <img style={{marginLeft:'auto'}} src={photoURL} alt='profile' />
                                {uid !== auth.currentUser.uid && 
                                    <small style={{color:'grey', display:'block', marginLeft:'auto', textAlign:'center', fontSize:'11px'}}>{displayName}</small>
                                }
                                
                            </div>
                            <div>
                                <p> {message}</p>
                            </div>
                        </div>
                    </div>
                    
                ))}
            </div>

            <SendChat scroll={scroll} />
            <div ref={scroll}></div>
        </>
    )
}

export default Chats