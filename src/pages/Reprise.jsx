import React, { useState, useRef, useContext, useEffect } from 'react'
import latinNames from '../utils/LatinNameList'
import citys from '../utils/City-list'
import { AuthContext } from '../contexts/Auth'
import firebase from '../utils/firebase-config'
import { Redirect } from 'react-router-dom'

export default function Reprise(props) {
    const [complete, setComplete] = useState(false)
    const [completeTwo, setCompleteTwo] = useState(false)
    const textInput = useRef()
    const textInputTwo = useRef()
    const [capture, setCapture] = useState()
    const [success, setSuccess] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState()

    /**
     * Get data from firestore
     * @return capture
     * @return docId
     */
    useEffect(() => {
        firebase.firestore().collection("reprises").where('id', "==", props.match.params.reprise)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                const id = querySnapshot.docs.map(doc => doc.id);
                setId(id[0]);
                setCapture(data[0]);
            });
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
     * Check if input value is in citys array
     * @param {event} e 
     * @return Complete
     */
    const checkIfInArrayTwo = (e) => {
        if (e.target.value !== "") {
            setCompleteTwo(citys.filter(name => name.includes(e.target.value)))
        } else {
            setCompleteTwo(false)
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
     * On click change value of auto-complete input
     * @param {event} e 
     */
    const changeInputValueTwo = (e) => {
        textInputTwo.current.value = e.target.textContent;
        setCompleteTwo(false)
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
        console.log(id)
        firebase.firestore().collection('reprises').doc(id).update({
            weight: e.target.weight.value,
            latin: e.target.latin.value,
            envergure: e.target.envergure.value,
            adiposity: e.target.adiposity.value,
            sexe: e.target.sexe.value,
            age: e.target.age.value,
            captype: e.target.captype.value,
            user: currentUser.email,
            updatedAt: new Date(),
            ring: e.target.ring.value,
            place: e.target.place.value,
        }).then(
            setSuccess(true)
        );
        
        setRedirect(true)

    }

    
    if (redirect) {
        return <Redirect to={'/reprises'} />
    }

    return (
        <section>
            <div className="capture__wrapper">
                <button className="back" onClick={props.history.goBack}>Retour</button>
            </div>
            <h2 className="capture__heading">{capture ? capture.ring : '/'}</h2>
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
            <div className="autocomplete">
                        <input type="text" onChange={(e) => checkIfInArrayTwo(e)} ref={textInputTwo} placeholder="Gavia stellata" name="place" defaultValue={capture.place ?? ''}/>
                {completeTwo ?
                    <ul>
                        {
                            completeTwo.map((item, id) => <li key={id} onClick={e => changeInputValueTwo(e)}>{item}</li>)
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

