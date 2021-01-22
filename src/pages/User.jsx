import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase-config'

export default function User(props) {
    const [user, setUser] = useState();
    const [captures, setCaptures] = useState(0);
    const [sites, setSites] = useState([]);

        useEffect(() => {
            firebase.firestore().collection("users").where('email', '==', props.match.params.user)
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    console.log(data)
                    setUser(data[0]);
                })
            firebase.firestore().collection("captures").where('user', '==', props.match.params.user)
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    console.log(data)
                    setCaptures(data);
                })
            let places = [];



            if (captures) {
                captures.forEach(site => {
                        places.push(site.place);
                })

            places = [...new Set(places)]
            } 
            setSites(places.sort())
        }, [])
    
    console.log(sites)
    
    return (
        <section className="content user">
            <div className="user__wrapper">
                <button className="back" onClick={props.history.goBack}><svg version="1.1" id="Capa_1" x="0px" y="0px"
	 viewBox="0 0 240.823 240.823">
<g>
	<path id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
		l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
		C52.942,116.507,52.942,124.327,57.633,129.007z" />
                        </g>
</svg>Retour</button>
            </div>
            {
                user ?
                    <section>
                        <h2 className="heading user__heading">{user.name ?? '/'}</h2>
                        <p className="user__id">{user.id ?? '/'}</p>
                        <a href={"mailto:" + user.email} className="user__email">{user.email ?? "/"}</a>
                        {captures ? 
                            <Fragment>
                                <p className="user__message">Cet utilisateur à <strong>{captures.length}</strong> captures sur les sites :</p>
                                <ul className="user__captures">
                                    {sites ? sites.map((place, id)=>
                                        <li key={id} className="user__item">{place}</li>

                                    ):<p className="error">Les sites n’ont pas été trouvé</p>
                                    }
                                </ul>
                            </Fragment>
                        : 'Pas encore de captures'}
                    </section> : 'Cet utilisateur n’existe pas.'
            }
            
        </section>
    )
}
