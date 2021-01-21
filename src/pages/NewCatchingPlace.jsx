import React, {Fragment, useState} from 'react'
import { Redirect } from 'react-router-dom'
import GMap from '../components/GMap'
import firebase from '../utils/firebase-config'

export default function NewCatchingPlace() {
    const [position, setPosition] = useState({
        lat: 51.260197,
        lng: 4.402771
    })

    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(false)

    const getCoordinates = (t, map, coord) => {
        console.log(coord);
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setPosition({ lat: lat, lng: lng });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().collection('places').doc().set({
            lng: position.lng,
            lat: position.lat,
            superficy: e.target.superficy.value,
            name: e.target.name.value,
        }).then(
            setRedirect(true)
        ).catch(error => setError('Une erreur est survenue : ' + error))

    }

    if (redirect) {
        return <Redirect to={'/'} />
    }

    return (
        <Fragment>
            {error ? <p className="error">error</p> : ""}
            <form action="/" method="get" onSubmit={e => handleFormSubmit(e)} className="catchingplace__form form">
                <label htmlFor="name" className="label">Nom du lieux</label>
                <input type="number" id="name" name="name" min={0} defaultValue={0} />
                <label htmlFor="superficy" className="label">Superficie</label>
                <input type="number" id="superficy" name="superficy" min={0} defaultValue={0} />
                <button type="submit">Enregistrer</button>
            </form>
            <div className="map-wrapper">
                <GMap positions={[position]} initialPos={position} zoom={8} getCoordinates={getCoordinates} />
            </div>
        </Fragment>
    )
}
