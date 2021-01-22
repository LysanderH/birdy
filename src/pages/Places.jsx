import React, { Fragment, useState, useEffect } from 'react'
import GMap from '../components/GMap'
import firebase from '../utils/firebase-config'

export default function Places() {
    const [position, setPosition] = useState()

    useEffect(() => {
        firebase.firestore().collection('places').get().then(
            querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setPosition(data);
            }
        )
    }, [])

    // console.log(position)

    return (
        <section className="content content--map">
            <GMap positions={position} initialPos={{ lat: 51.260197, lng: 4.402771 }} zoom={8} />
        </section>
    )
}
