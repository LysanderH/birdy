import React, { Fragment, useCallback } from 'react'
import { Redirect } from 'react-router-dom';
import '../css/Register.scss'
import firebase from '../utils/firebase-config'


export default function Register() {

    const handleSignUp = useCallback(async e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const id = e.target.id.value.replaceAll(/\s/g,'');
        const password = e.target.password.value;
        const passwordConfirm = e.target.confirmation.value;


        // Check if name is valid
        if (/\d/.test(name)) {
            alert("Seul des lettres sont acceptées dans le nom.");
            return (false);
        }
        
        // Check if email is valid
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            alert("Vous avez entrez une adresse mail qui n’est pas valide!");
            return (false);
        }

        // Check if provided id is valid
        if (!/[0-9]{4}-[a-zA-Z]{2}/.test(id))
        {
            alert("Vous avez entrez un identifiant qui n’est pas valide!");
            return (false);
        }

        // Check if password is valid
        if (password.length > 8) {
            alert("Veuillez entrez un mot de passe de minimum 8 caractères.");
            return (false);
        }

        console.log(password +' '+ passwordConfirm);
        // Check if passwordConfirm matches password
        if (password !== passwordConfirm) {
            alert("Le mot de passe ne correspond pas avec le mot de passe de confirmation.");
            return (false);
        }

        try {
            await firebase.firestore().collection('users').doc().set({
                name: name,
                email: email,
                id: id
            });
        } catch (error) {
            alert(error);
        }

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            <Redirect to="/login" />
        } catch (error) {
            alert(error);
        }
    }, []);

    return (
        <Fragment>
            <form action="/" className="register__form" onSubmit={e=>handleSignUp(e)}>
                <label htmlFor="name" className="register__label">Nom</label>
                <input type="text" className="register__text-input" name="name" id="name" placeholder="John Doe" />
                <label htmlFor="email" className="register__label">Email</label>
                <input type="email" className="register__text-input" name="email" id="email" placeholder="john@mail.be" />
                <label htmlFor="isn-id" className="register__label">Id de l’institut des Sciences Naturelles</label>
                <input type="text" className="register__text-input" name="id" id="isn-id" placeholder="4720 - XD" />
                
                <div className="register__pwd-wrapper">
                    <label htmlFor="password" className="register__label"></label>
                        <input type="text" className="register__text-input" name="password" id="password" placeholder="*******" />
                        <button className="register__pwd-btn">Afficher le mot de passe</button>
                </div>
                    
                <div className="register__pwd-wrapper">
                    <label htmlFor="confirmation" className="register__label"></label>
                        <input type="text" className="register__text-input" name="confirmation" id="confirmation" placeholder="*******" />
                        <button className="register__pwd-btn">Afficher le mot de passe</button>
                </div>
                    
                <button type="submit" className="btn btn--form">Créer votre compte</button>
            </form>
        </Fragment>
    )
}