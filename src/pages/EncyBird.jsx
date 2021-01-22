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
        <section className="content">
            <button className="back" onClick={props.history.goBack}><svg version="1.1" id="Capa_1" x="0px" y="0px"
	 viewBox="0 0 240.823 240.823">
<g>
	<path id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
		l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
		C52.942,116.507,52.942,124.327,57.633,129.007z" />
                        </g>
</svg>Retour</button>
            <h2 className="sr-only">Fische oiseau</h2>
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
                    <div className="ency__wrapper">
                {bird.alimentation ? bird.alimentation.map((item, id) => 
                    <dd className="ency__definition ency__definition--alimentation" key={id}>{item}</dd>
                        ) : '/'}
                        </div>
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
                    <dd className="ency__definition ency__definition--map">{bird.distribution ? <GMap initialPos={position} positions={bird.distribution} zoom={8} getCoordinates={getCoordinates} /> : '/'}</dd>
                </dl>
                : "Loading"
                    }
        </section>
    )
}
