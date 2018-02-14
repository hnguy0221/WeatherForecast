import React, { Component } from 'react';

export default class GoogleMap extends Component {
    componentDidMount() {
        const myLatLng = {
            lat: this.props.latitude,
            lng: this.props.longitude
        };
        const map = new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: myLatLng
        });
        const marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        });
        marker.addListener('click', () => {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        });
    }
    render() {
        return (
            //this.refs.map
            <div ref="map" />
        );
    }
}