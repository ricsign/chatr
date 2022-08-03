import React, { useState } from 'react'

import { auth } from '../serve/firebase'
import { timeDifference, numberToColorHsl} from '../serve/common'

function Chat({ chat: { uid, photoURL, displayName, message, healthiness, timestamp} }) {
  const healthinessThreshold = 0.1
  const [ visible, setVisible ] = useState(false)

  const handleVisibility = (e) => {
    if(e.detail !== 2 || healthiness > healthinessThreshold) return;
    setVisible((visible) => !visible)
  }

  return (
    <div>
        <div key={ Math.random() } className={`chat ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
            <div>
                <img style={{marginLeft:'auto'}} src={photoURL} alt='profile' loading="lazy" decoding="async" />
                {uid !== auth.currentUser.uid && 
                    <small style={{color:'grey', display:'block', textAlign:'center'}}>{displayName.length > 10 ? displayName.substring(0,10)+ "." : displayName}</small>
                }
                <small style={{color:'grey', display:'block', fontSize:'10px', textAlign:'center'}}>{timeDifference(new Date(Date.now()), new Date(timestamp.seconds*1000))}</small>
            </div>

            <div onClick={(e) => handleVisibility(e)}>
                {healthiness > healthinessThreshold || visible ?  
                    <p> {message} </p> :
                    <p style={{color:'red'}}> This message might be toxic. Double click to toggle view. </p>
                }
            </div>

            <div>
                <p style={{color: 'white', backgroundColor: numberToColorHsl(healthiness), padding:'10px', fontSize:'12px', fontWeight:'bold', marginTop:"0px", borderRadius:"20px"}}> {healthiness > healthinessThreshold ? "H" : "T"} </p>        
            </div>
        </div>
    </div>
  )
}

export default Chat