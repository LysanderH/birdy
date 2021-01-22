import React, {Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase-config'

export default function Encyclopedy() {
    const [encyclopedy, setEncyclopedy] = useState([]);

        useEffect(() => {
            firebase.firestore().collection("encyclopedy").orderBy('latin')
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    console.log(data)
                    setEncyclopedy(data);
                })
        }, [])
    
    // const seedData = () => {

    //     firebase.firestore().collection('encyclopedy').doc().set({
    //         id: Math.random().toString(36).substr(2, 9) + '_' + Math.random().toString(36).substr(2, 9),
    //         name: 'Accenteur Alpin',
    //         latin: 'Prunella collaris',
    //         famely: 'Prunellidés',
    //         foto: new Date().getTime().toString() + '.jpg',
    //         description: "L'Accenteur alpin est oiseau plus corpulent que son cousin l'Accenteur mouchet et également plus coloré. L'adulte nuptial a la tête grise marquée d'un œil rouge sombre. La base jaune du bec est bien visible. La gorge blanche est pointillée de noir. Les parties supérieures grises sont fortement rayées de noirâtre.",
    //         height: 18,
    //         envergure: 18,
    //         weight: 25,
    //         lifespan: 239042482,
    //         alimentation: ['insectes', 'vers', 'graines', 'araignées', 'baies', 'mollusques'],
    //         nesting: "Les nids des accenteurs alpins se trouvent dans les rochers, près d'un endroit ouvert et rocailleux.",
    //         habitat: "L'accenteur alpin vit en haute montagne, le plus couramment à plus de 1800 mètres d'altitude. On observe parfois des migrations partielles. On l'observe sur la plupart des grands massifs montagneux d'Europe et d'Asie. La population d'Europe serait entre 47 000 et 73 000 individus (1994). En hiver, l'accenteur alpin descend vers la plaine pour avoir un climat plus clément.",
    //         behaviour: "L'Accenteur alpin est un oiseau commun dans son habitat alpin. Comme il n'est pas du tout farouche, on peut l'approcher facilement à quelques pas.",
    //         distribution: [],
    //         chipping: new Date().getTime().toString() + '.mp3'
    //         });
    // }

    return (
        <section className="content">
            <h2 className="heading">Encyclopédie</h2>
            <ul className="encyclopedy__list">
                {
                    encyclopedy ? encyclopedy.map((encyclopedy, id) =>
                        <li className="encyclopedy__item" key={id}>
                            <Link to={"/encyclopedy/" + encyclopedy.id} className="encyclopedy__link">
                                <p className="encyclopedy__latin">{encyclopedy.latin}</p>
                                <p className="encyclopedy__name">{encyclopedy.name}</p>
                            </Link>
                
                        </li>
                    ) : "Il n’y a pas d'utilisateurs pour le moment."
                }
            </ul>
            {/* <button onClick={seedData}>Seed</button> */}
        </section>
        )
}
