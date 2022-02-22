<template>
<div id="map" v-bind:style="styleMap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
    name: "BaseMap",
    data() {
        return {
            accessToken: 'pk.eyJ1IjoiamFzc3VsYW4iLCJhIjoiY2tyemIxdzVwMThjcjJubjh1Z21ibTI4YyJ9.NEU2B4eedUTXvYNcKEaltg',
            styleMap: {
                display: 'flex',
                width: '100%',
                height: '100%',
            },
        };
    },
    mounted() {
        mapboxgl.accessToken = this.accessToken;
        const nav = new mapboxgl.NavigationControl();
        const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});
        new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-94.74, 39.12], // starting position [lng, lat]
            zoom: 2.6 // starting zoom
        })
        .addControl(nav, "top-right") // // zoom in, zoom out control
        .addControl(geolocate, "top-right") // // user geolocation control
        .addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')})) // full screen control
        ;

        
    },
};
</script>
