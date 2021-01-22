import React, { Fragment, useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import '../css/Register.scss'
import firebase from '../utils/firebase-config'


export default function Register() {

    const [password, setPassword] = useState(false);
    const [verification, setVerification] = useState(false);

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

    const showVerification = (e) => {
        e.preventDefault()
    setVerification(!verification)
}
    const showPassword = (e) => {
        e.preventDefault()
    setPassword(!password)
}

    return (
        <section className="content register">
            <form action="/" className="register__form form" onSubmit={e=>handleSignUp(e)}>
                <label htmlFor="name" className="register__label label">Nom</label>
                <input type="text" className="register__text-input input" name="name" id="name" placeholder="John Doe" />
                <label htmlFor="email" className="register__label label">Email</label>
                <input type="email" className="register__text-input input" name="email" id="email" placeholder="john@mail.be" />
                <label htmlFor="isn-id" className="register__label label">Id de l’institut des Sciences Naturelles</label>
                <input type="text" className="register__text-input input" name="id" id="isn-id" placeholder="4720 - XD" />
                
                <label htmlFor="password" className="register__label label">Mot de passe</label>
                <div className="register__pwd-wrapper">
                        <input type={password ? "text" : "password"} className="register__text-input input" name="password" id="password" placeholder="*******" />
                        <button className="register__pwd-btn" onClick={e=>showPassword(e)}><svg version="1.1" id="Capa_1" x="0px" y="0px"
	 viewBox="0 0 511.999 511.999">
<g>
	<g>
		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
	</g>
</g>
<g>
	<g>
		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
	</g>
</g>
</svg></button>
                </div>
                    
                <label htmlFor="confirmation" className="register__label label">Vérifier le mot de passe</label>
                <div className="register__pwd-wrapper">
                        <input type={verification ? "text" : "password"} className="register__text-input input" name="confirmation" id="confirmation" placeholder="*******" />
                        <button className="register__pwd-btn" onClick={e=>showVerification(e)}><svg version="1.1" id="Capa_1" x="0px" y="0px"
	 viewBox="0 0 511.999 511.999">
<g>
	<g>
		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
	</g>
</g>
<g>
	<g>
		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
	</g>
</g>
</svg></button>
                </div>
                <Link to="/login">J’ai un compte</Link>
                <button type="submit" className="btn btn--form">Créer votre compte</button>
            </form>
        </section>
    )
}