import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom';
import firebase from '../utils/firebase-config'

export default function Home() {
    const [error, setError] = useState('');
    const [reprise, setReprise] = useState(false)
    const [capture, setCapture] = useState(false)

    const associacions = ['AOB', 'FOW', 'KBOF', 'AZ', 'DKB', 'FOI', 'AB', 'NB'];

    const checkRingNumber = (e) => {
        e.preventDefault();
        const ringOne = e.target.ring_one.value.replaceAll(/\s/g,'').toUpperCase();
        const ringTwo = e.target.ring_two.value.replaceAll(/\s/g,'');
        const ringThree = e.target.ring_three.value.replaceAll(/\s/g,'');
        const ringFour = e.target.ring_four.value.replaceAll(/\s/g,'');
        const ringFive = e.target.ring_five.value.replaceAll(/\s/g, '');
        
        if (!associacions.includes(ringOne)) {
            setError('Le numéro d’association n’est pas correct.')
        }

        if (ringTwo.lenth || ringThree.lenth || ringFour.lenth) {
            setError('Le numéro de bague n’est pas correct.')
        }

        const ring = ringOne + ' ' + ringTwo + ' ' + ringThree + ' ' + ringFour + ' ' + ringFive;
        
        firebase.firestore().collection("captures").where('ring', '==', ring).get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => doc.id);
                if (typeof data !== 'undefined' && data.length > 0) {
                    setReprise(data[0])
                }else {
                    setCapture(ring);
                }
            });
    }

    if (capture) {
        return <Redirect to={"/new-capture/" + capture} />
    }
    if (reprise) {
        return <Redirect to={"/new-reprise/" + reprise} />
    }

    return (
        <Fragment>
            <form action="/" method="get" className="form" onSubmit={e => checkRingNumber(e)}>
                <legend className="home__legend">Numéro de bague</legend>
                <div className="home__wrapper">
                    <input type="text" name="ring_one" id="ring_one" className="home__input input" placeholder="AOB" required />
                    <input type="text" name="ring_two" id="ring_two" className="home__input input" placeholder="05" required />
                    <input type="text" name="ring_three" id="ring_three" className="home__input input" placeholder="Y010" required />
                    <input type="text" name="ring_four" id="ring_four" className="home__input input" placeholder="123" required />
                    <input type="text" name="ring_five" id="ring_five" className="home__input input" placeholder="YB" />
                </div>
                {error ? <p className="home__error error">{error}</p>: ''}
                
                <button className="btn">Envoyer</button>
            </form>
        </Fragment>
    )
}
