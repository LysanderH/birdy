import React, { Fragment, useContext, useState, useCallback } from 'react'
import { AuthContext } from '../contexts/Auth';
import { Redirect } from "react-router";
import firebase from '../utils/firebase-config'
import { Link } from 'react-router-dom';

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
            <section className="content register">
                <form action="/" className="register__form form" onSubmit={handleLogin}>
                    <label htmlFor="email" className="label register__label">Email</label>
                    <input type="email" className="input register__text-input" name="email" id="email" placeholder="john@mail.be" />
                    
                    <label htmlFor="password" className="label register__label">Mot de passe</label>
                    <div className="register__pwd-wrapper">
                        <input type={hidden ? 'text' : 'password'} className="register__text-input input" name="password" id="password" placeholder="*******" />
                        <button className="register__pwd-btn" onClick={e=>changePassword(e)}><svg version="1.1" id="Capa_1" x="0px" y="0px"
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
                <Link to="/register">Je n'ai pas de compte</Link>
                    <button type="submit" className="btn btn--form">Connexion</button>
                </form>
            </section>
            )
        }
        