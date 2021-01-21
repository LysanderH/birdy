import React, { Fragment, useContext, useState, useCallback } from 'react'
import { AuthContext } from '../contexts/Auth';
import { Redirect } from "react-router";
import firebase from '../utils/firebase-config'

export default function Login() {
    
    const [hidden, setHidden] = useState(false);
    
    const changePassword = (e) => {
        e.preventDefault();
        setHidden(!hidden);
    }
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                // history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        []
    );
    
    const { currentUser } = useContext(AuthContext);

        
        if (currentUser) {
            return <Redirect to="/" />;
        }
        
        return (
            <Fragment>
                <form action="/" className="register__form" onSubmit={handleLogin}>
                    <label htmlFor="email" className="register__label">Email</label>
                    <input type="email" className="register__text-input" name="email" id="email" placeholder="john@mail.be" />
                    
                    <label htmlFor="password" className="register__label">Mot de passe</label>
                    <div className="register__pwd-wrapper">
                        <input type={hidden ? 'text' : 'password'} className="register__text-input" name="password" id="password" placeholder="*******" />
                        <button className="register__pwd-btn" onClick={e=>changePassword(e)}>Afficher le mot de passe</button>
                    </div>            
                    <button type="submit" className="btn btn--form">Créer votre compte</button>
                </form>
            </Fragment>
            )
        }
        