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
        <section>
            <div className="capture__wrapper">
                <button className="back" onClick={props.history.goBack}>Retour</button>
            </div>
            {
                user ?
                    <Fragment>
                        <h2>{user.name ?? '/'}</h2>
                        <p>{user.id ?? '/'}</p>
                        <a href={"mailto:" + user.email}>{user.email ?? "/"}</a>
                        {captures ? 
                            <Fragment>
                                <p>Cet utilisateur à {captures.length} captures</p>
                                <ul>
                                    {sites ? sites.map((place, id)=>
                                        <li key={id}>{place}</li>

                                    ):''
                                    }
                                </ul>
                            </Fragment>
                        : 'Pas encore de captures'}
                    </Fragment> : 'Cet utilisateur n’existe pas.'
            }
            
        </section>
    )
}
