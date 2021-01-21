import React, { useEffect, useState } from 'react'
import firebase from '../utils/firebase-config'

export default function Image(props) {
    const [url, setUrl] = useState('');

    useEffect(() => {
            firebase.storage().ref('/encyclopedy/' + props.foto).getDownloadURL().then((url) => {
                setUrl(url);
            })
    })
    
    return (
        <img src={url} width={props.width} height={props.height} alt="montrant l’oiseaux" />
    )
}
