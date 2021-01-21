import React, { useEffect, useState } from 'react'
import firebase from '../utils/firebase-config'

export default function Audio(props) {
    const [url, setUrl] = useState('');

    useEffect(() => {
            firebase.storage().ref('/encyclopedy/' + props.audio).getDownloadURL().then((url) => {
                setUrl(url);
            })
    })
    
    return (
        <figure>
            <audio
                controls
                src={url}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </figure>
    )
}
