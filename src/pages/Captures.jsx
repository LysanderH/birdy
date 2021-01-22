import React, {Fragment, useState, useEffect, useContext} from 'react'
import firebase from '../utils/firebase-config'
import { AuthContext } from '../contexts/Auth'
import { Link } from 'react-router-dom';

export default function Captures() {
    const [captures, setCaptures] = useState()

const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        firebase.firestore().collection('captures').where('user', '==', currentUser.email).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                data.sort((a, b) => {
                    if (a.capturedAt.seconds > b.capturedAt.seconds) {
                        return -1;
                    } else if(a.capturedAt.seconds < b.capturedAt.seconds) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                setCaptures(data);
            }).catch(error => console.error(error));
    }, [])

    console.log(captures)

    const getDate= (sec) => {
        const date = new Date(1970, 0, 1)
        date.setSeconds(sec)
        return date.toLocaleDateString("fr-BE")
    }

    return (
        <section className="content">
            <h2 className="heading">Vos captures</h2>
            {captures ?
                <ul className="captures__list list">
                    {
                        captures.map((capture, id) =>
                            <li className="captures__item item" key={id}>
                                <Link to={'/captures/' + capture.ring}>
                                    <dl className="captures__data-list">
                                        <dt className="captures__ring">{capture.ring}</dt>
                                        <dd className="captures__date">{ getDate(capture.capturedAt.seconds) }</dd>
                                        <dd className="captures__latin">{capture.latin}</dd>
                                        <dd className="captures__place">{capture.place}</dd>
                                    </dl>
                                </Link>
                            </li>
                        )
                    }
                </ul> : 'Vous n’avez pas encore capturer d’oiseaux'
            }
        </section>
    )
}