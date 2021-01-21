import React from 'react'

export default function AddCapture(props) {
    return (
        <div>
            Nouvelle Capture {props.match.params.ring}
        </div>
    )
}
