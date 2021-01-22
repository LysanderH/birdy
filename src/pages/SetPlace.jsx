import React, { useState, useRef } from 'react'
import firebase from '../utils/firebase-config'
import { Redirect } from 'react-router-dom'
import citys from '../utils/City-list'

export default function SetPlace(props) {
    const [complete, setComplete] = useState(false)
    const textInput = useRef()
    const [redirect, setRedirect] = useState(false)

    const checkIfInArray = (e) => {
        if (e.target.value !== "") {
            setComplete(citys.filter(name => name.includes(e.target.value)))
        } else {
            setComplete(false)
        }
    }

    const changeInputValue = (e) => {
        textInput.current.value = e.target.textContent;
        setComplete(false)
    }

    const submitForm = (e) => {
        e.preventDefault();
        firebase.firestore().collection('captures').doc(props.match.params.ring).update({
            place: e.target.city.value
        });
            
            firebase.firestore().collection('captures').where('place', '==', e.target.city.value).get().then(
                querySnap => {
                    const data = querySnap.docs.map(doc => doc.data());
                    if (data.length === 10) {
                        setRedirect('/new-catching-place')
                    } else {
                        setRedirect('/')
                    }
            }
        )
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <form action="/" method="get" className="form" onSubmit={e=> submitForm(e)}>
            <label htmlFor="city" className="label">Lieux de capture</label>
            <div className="autocomplete">
                <input type="text" onChange={(e) => checkIfInArray(e)} ref={ textInput } placeholder="Liège" id="city" name="city" className="input" />
                {complete ?
                    <ul className="autocomplete__list">
                        {
                            complete.map((item, id) => <li key={id} onClick={e => changeInputValue(e)} className="autocomplete__item">{item}</li>)
                        }
                    </ul> : ''
                }
            </div>
            <button type="submit" className="btn btn--form">Enregistrer</button>
        </form>
    )
}
