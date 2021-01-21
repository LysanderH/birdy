import React, {Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase-config'

export default function Users() {
    const [userCollection, setUserCollection] = useState([]);

        useEffect(() => {
            firebase.firestore().collection("users").orderBy('name')
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    setUserCollection(data);
                })
        }, [])

    return (
        <Fragment>
            <ul className="users__list">
                {
                    userCollection ? userCollection.map((user, id) =>
                        <li className="users__item" key={id}>
                            <Link to={'/users/' + user.email}>
                                <p className="users__name">{user.name}</p>
                                <p className="users__email">{user.email}</p>
                            </Link>

                
                        </li>
                    ) : "Il n’y a pas d'utilisateurs pour le moment."
                }
        </ul>
        </Fragment>
        )
    }
    