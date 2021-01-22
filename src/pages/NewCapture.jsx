import React, { useState, useRef, useContext } from 'react'
import latinNames from '../utils/LatinNameList'
import { AuthContext } from '../contexts/Auth'
import firebase from '../utils/firebase-config'
import { Redirect } from 'react-router-dom'

export default function NewCapture(props) {
    const [complete, setComplete] = useState(false)
    const textInput = useRef()
    const [redirect, setRedirect] = useState(false)
    const [doc, setDoc] = useState()

    const checkIfInArray = (e) => {
        if (e.target.value !== "") {
            setComplete(latinNames.filter(name => name.includes(e.target.value)))
        } else {
            setComplete(false)
        }
    }

    const changeInputValue = (e) => {
        textInput.current.value = e.target.textContent;
        setComplete(false)
    }
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser.email)

    const submitForm = async (e) => {
        e.preventDefault();
        const capture = await firebase.firestore().collection('captures').add({
            ring: props.match.params.ring,
            weight: e.target.weight.value,
            latin: e.target.latin.value,
            envergure: e.target.envergure.value,
            adiposity: e.target.adiposity.value,
            sexe: e.target.sexe.value,
            age: e.target.age.value,
            captype: e.target.captype.value,
            user: currentUser.email,
            capturedAt: new Date()
        });

        setDoc(capture.id)

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={ "/new-capture/" + doc + "/place" } />
    }


    return (
        <section className="content">
            <h2 className="sr-only">Une nouvelle capture</h2>
            <form action="/" method="get" className="form" onSubmit={e=> submitForm(e)}>
                <label htmlFor="latin" className="label">Nom latin</label>
                <div className="autocomplete">
                    <input type="text" onChange={(e) => checkIfInArray(e)} ref={ textInput } placeholder="Gavia stellata" name="latin" className="input" />
                    {complete ?
                        <ul className="autocomplete__list">
                            {
                                complete.map((item, id) => <li key={id} onClick={e => changeInputValue(e)} className="autocomplete__item" autocomplete="false">{item}</li>)
                            }
                        </ul> : ''
                    }
                </div>
                <label htmlFor="envergure" className="label">Envergure (cm)</label>
                <input type="number" className="input" id="envergure" name="envergure" min="0" defaultValue="0"/>
                <label htmlFor="weight" className="label">Poids (g)</label>
                <input type="number" className="input" id="weight" name="weight" min="0" defaultValue="0" />
                <label htmlFor="adiposity" className="label">Adiposité (%)</label>
                <input type="number" className="input" id="adiposity" name="adiposity" min="0" defaultValue="0" />
                <label htmlFor="sexe" className="label">Sexe</label>
                <select className="input" id="sexe" name="sexe" defaultValue={'DEFAULT'}>
                    <option className="option" disabled value='DEFAULT'>Choisir un sexe</option>
                    <option className="option">Mâle</option>
                    <option className="option">Femelle</option>
                </select>
                <label htmlFor="age" className="label">Âge</label>
                <select className="input" id="age" name="age" defaultValue={'DEFAULT'}>
                    <option className="option" value="DEFAULT" disabled>Choisir une tranche d’âge</option>
                    <option className="option">Enfant</option>
                    <option className="option">Adulte</option>
                </select>
                <label htmlFor="captype" className="label">Type de capture</label>
                <select className="input" id="captype" name="captype" defaultValue={'DEFAULT'}>
                    <option className="option" value="DEFAULT" disabled>Choisir une méthode de capture</option>
                    <option className="option">Nid</option>
                    <option className="option">Filet</option>
                </select>
                <button type="submit" className="btn btn--form">Continuer</button>
                </form>
        </section>
    )
}
