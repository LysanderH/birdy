import React, { Component, Fragment } from 'react'
import { Map,InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component{
       constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    onMarkerClick = (props, marker) =>{
        console.log('test')
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        })
    };


    render(){
        return (
            <Fragment>
            <Map google={this.props.google}
                zoom={this.props.zoom}
                initialCenter={this.props.initialPos}
                onClick={this.props.getCoordinates}
                style={{width: '100%', height: '30%'}}
                >

                {this.props.positions ? this.props.positions.map((position, key) =>
                    <Marker position={position} key={key} name={position.name} superficy={position.superficy} onClick={this.onMarkerClick} />
                    ) : ''}
                    
            </Map>
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyABwrM1zTcwtCEE8DkGxd8ccM54RHPTI88")
})(MapContainer)