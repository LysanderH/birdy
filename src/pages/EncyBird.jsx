import React, { Fragment, useState, useEffect } from 'react'
import Image from '../components/Image';
import Audio from '../components/Audio';
import firebase from '../utils/firebase-config'
import GMap from '../components/GMap';

export default function EncyBird(props) {
    const [bird, setBird] = useState([]);
    const position = {
        lat: 51.260197,
        lng: 4.402771
    }

    useEffect(() => {
        firebase.firestore().collection("encyclopedy").where('id', "==", props.match.params.bird)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setBird(data[0]);
            });
    }, [])
    // console.log(bird.distribution);
    const getCoordinates = () => {
        return true;
    }

    return (
        <Fragment>
            <button className="back" onClick={props.history.goBack}>Retour</button>
            {bird ? 
            <dl className="ency__list">
                <dt className="ency__therm">Nom</dt>
                <dd className="ency__definition">{ bird.name ?? '/' }</dd>
                <dt className="ency__therm">Nom latin</dt>
                <dd className="ency__definition">{ bird.latin ?? '/' }</dd>
                <dt className="ency__therm">Famille</dt>
                <dd className="ency__definition">{ bird.famely ?? '/' }</dd>
                <dt className="ency__therm">Foto</dt>
                    <dd className="ency__definition">{bird.foto ? <Image foto={bird.foto} width={300} height={225} /> : 'Pas de photos'}</dd>
                <dt className="ency__therm">Description</dt>
                <dd className="ency__definition">{ bird.description ?? '/' }</dd>
                <dt className="ency__therm">Taille</dt>
                <dd className="ency__definition">{ bird.height ?? '/' } cm</dd>
                <dt className="ency__therm">Envergure</dt>
                <dd className="ency__definition">{ bird.envergure ?? '/' } cm</dd>
                <dt className="ency__therm">Temps de vie</dt>
                <dd className="ency__definition">{ Math.round(bird.lifespan/3600/24/365) ?? '/' } ans</dd>
                <dt className="ency__therm">Alimentation</dt>
                {bird.alimentation ? bird.alimentation.map((item, id) => 
                    <dd className="ency__definition" key={id}>{item}</dd>
                    ) : '/'}
                <dt className="ency__therm">Nidification</dt>
                <dd className="ency__definition">{ bird.nesting ?? '/' }</dd>
                <dt className="ency__therm">Habitat</dt>
                <dd className="ency__definition">{ bird.habitat ?? '/' }</dd>
                <dt className="ency__therm">Comportement</dt>
                <dd className="ency__definition">{ bird.behaviour ?? '/' }</dd>
                <dt className="ency__therm">Chant</dt>
                    <dd className="ency__definition">{bird.chipping ? <Audio audio={bird.chipping} /> : '/'}</dd>
                <dt className="ency__therm">Distribution</dt>
                    {/* <dd className="ency__definition"><GMap initialPos={position} positions={[position]} /></dd> */}
                    <dd className="ency__definition">{bird.distribution ? <GMap initialPos={position} positions={bird.distribution} zoom={8} getCoordinates={getCoordinates} /> : '/'}</dd>
                </dl>
                : "Loading"
                    }
        </Fragment>
    )
}
