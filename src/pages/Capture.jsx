import React, { useState, useRef, useContext, useEffect } from 'react'
import latinNames from '../utils/LatinNameList'
import { AuthContext } from '../contexts/Auth'
import firebase from '../utils/firebase-config'
import { Redirect } from 'react-router-dom'

export default function Capture(props) {
    const [complete, setComplete] = useState(false)
    const textInput = useRef()
    const [capture, setCapture] = useState()
    const [docId, setDocId] = useState()
    const [success, setSuccess] = useState(false)
    const [redirect, setRedirect] = useState(false)

    /**
     * Get data from firestore
     * @return capture
     * @return docId
     */
    useEffect(() => {
        firebase.firestore().collection('captures').where('ring', '==', props.match.params.capture).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                const id = querySnapshot.docs.map(doc => doc.id);
                setCapture(data[0]);
                setDocId(id[0]);
            }).catch(error => console.error(error));
    }, []);

    /**
     * Check if input value is in latinName array
     * @param {event} e 
     * @return Complete
     */
    const checkIfInArray = (e) => {
        if (e.target.value !== "") {
            setComplete(latinNames.filter(name => name.includes(e.target.value)))
        } else {
            setComplete(false)
        }
    }

    /**
     * On click change value of auto-complete input
     * @param {event} e 
     */
    const changeInputValue = (e) => {
        textInput.current.value = e.target.textContent;
        setComplete(false)
    }

    /**
     * Delete from firestore
     * @param {event} e 
     */
    const deleteCapture = (e) => {
        e.preventDefault();
        firebase.firestore().collection('captures').doc(docId).delete().then(
            setRedirect(true)
        ).catch(
            console.log('an error occured')
        );
    }

    /**
     * Get curred logged user
     */
    const { currentUser } = useContext(AuthContext);

    /**
     * Update bird on form submit
     * @param {event} e 
     */
    const submitForm = async (e) => {
        e.preventDefault();
        console.log(docId)
        firebase.firestore().collection('captures').doc(docId).update({
            weight: e.target.weight.value,
            latin: e.target.latin.value,
            envergure: e.target.envergure.value,
            adiposity: e.target.adiposity.value,
            sexe: e.target.sexe.value,
            age: e.target.age.value,
            captype: e.target.captype.value,
            user: currentUser.email,
            updatedAt: new Date()
        }).then(
            setSuccess(true)
        );

    }

    if (capture && currentUser.email !== capture.user) {
        return <Redirect to={"/"} />
    }

    
    if (redirect) {
        return <Redirect to={'/captures'} />
    }

    return (
        <section>
            <div className="capture__wrapper">
                <button className="back" onClick={props.history.goBack}>Retour</button>
                <button className="btn btn--delete" onClick={e=>deleteCapture(e)}>Supprimer</button>
            </div>
            <h2 className="capture__heading">{props.match.params.capture}</h2>
            {success ? <p className="success">La capture a bien été mis à jour.</p>:''}
            {capture ?
        <form action="/" method="get" className="form" onSubmit={e=> submitForm(e)}>
            <label htmlFor="">Nom latin</label>
            <div className="autocomplete">
                        <input type="text" onChange={(e) => checkIfInArray(e)} ref={textInput} placeholder="Gavia stellata" name="latin" defaultValue={capture.latin ?? ''}/>
                {complete ?
                    <ul>
                        {
                            complete.map((item, id) => <li key={id} onClick={e => changeInputValue(e)}>{item}</li>)
                        }
                    </ul> : ''
                }
            </div>
            <label htmlFor="envergure" className="label">Envergure (cm)</label>
                <input type="number" className="input" id="envergure" name="envergure" min="0" defaultValue={capture.envergure ?? 0}/>
            <label htmlFor="weight" className="label">Poids (g)</label>
            <input type="number" className="input" id="weight" name="weight" min="0" defaultValue={capture.weight ?? 0} />
            <label htmlFor="adiposity" className="label">Adiposité (%)</label>
            <input type="number" className="input" id="adiposity" name="adiposity" min="0" defaultValue={capture.adiposity ?? 0} />
            <label htmlFor="sexe" className="label">Sexe</label>
            <select className="input" id="sexe" name="sexe" defaultValue={capture.sexe ?? 'DEFAULT'}>
                <option className="option" disabled value='DEFAULT'>Choisir un sexe</option>
                <option className="option">Mâle</option>
                <option className="option">Femelle</option>
            </select>
            <label htmlFor="age" className="label">Âge</label>
            <select className="input" id="age" name="age" defaultValue={capture.age ?? 'DEFAULT'}>
                <option className="option" value="DEFAULT" disabled>Choisir une tranche d’âge</option>
                <option className="option">Enfant</option>
                <option className="option">Adulte</option>
            </select>
            <label htmlFor="captype" className="label">Type de capture</label>
            <select className="input" id="captype" name="captype" defaultValue={capture.captype ?? 'DEFAULT'}>
                <option className="option" value="DEFAULT" disabled>Choisir une méthode de capture</option>
                <option className="option">Nid</option>
                <option className="option">Filet</option>
            </select>
            <button type="submit" className="btn btn--submit">Mettre à jour</button>
                </form> : 'Chargement...'
        }
        </section>
    )
}
