import React, { useState, useEffect, useRef } from 'react'

import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../serve/firebase'
import { timeDifference, numberToColorHsl} from '../serve/common'

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
                {chats.map(({ id, uid, photoURL, displayName, message, healthiness, timestamp }) => (
                    <div>
                        <div key={ Math.random() } className={`chat ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <div>
                                <img style={{marginLeft:'auto'}} src={photoURL} alt='profile' />
                                {uid !== auth.currentUser.uid && 
                                    <small style={{color:'grey', display:'block', textAlign:'center'}}>{displayName.length > 10 ? displayName.substring(0,10)+ "." : displayName}</small>
                                }
                                <small style={{color:'grey', display:'block', fontSize:'10px', textAlign:'center'}}>{timeDifference(new Date(Date.now()), new Date(timestamp.seconds*1000))}</small>
                            </div>

                            <div>
                                <p> {message} </p>
                            </div>

                            <div>
                                <p style={{color: 'white', backgroundColor: numberToColorHsl(healthiness), padding:'10px', fontSize:'12px', fontWeight:'bold', marginTop:"0px", borderRadius:"20px"}}> {healthiness > 0.1 ? "H" : "T"} </p>        
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