<template>
  <div ref="mapDiv" id="map"></div>
</template>
<script>
import { computed, defineProps, onMounted, ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyDJgsrkslJjQjop3nxhLoRt-XdubE-3_y4";

import styles from "../mapStyle.js";
import userSvgMarker from "../assets/svg/marker-orange.svg";
import serverSvgMarker from "../assets/svg/marker-red.svg";

export default {
  props: {
    userPosition: Object,
    serverPosition: Object,
  },

  setup(props) {
    const userPos = computed(() => ({
      lat: props.userPosition.lat,
      lng: props.userPosition.lng,
    }));

    const serverPos = computed(() => (props.serverPosition && {
      lat: props.serverPosition.lat,
      lng: props.serverPosition.lng,
    }));

    const userMarkerIcon = ref(null);
    const serverMarkerIcon = ref(null);

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

    const mapDiv = ref(null);
    const map = ref(null);
    const zoom = ref(8);

    onMounted(async () => {
      await loader.load();

      map.value = new google.maps.Map(mapDiv.value, {
        disableDefaultUI: true,
        zoom: zoom.value,
        minZoom: zoom.value - 1,
        maxZoom: zoom.value + 3,
        styles: styles,
      });

      userMarkerIcon.value = userSvgMarker;
      serverMarkerIcon.value = serverSvgMarker;

      new google.maps.Marker({
        position: userPos.value,
        map: map.value,
        icon: userMarkerIcon.value,
      });

      if (serverPos) {
        new google.maps.Marker({
          position: serverPos.value,
          map: map.value,
          icon: serverMarkerIcon.value,
        });

        new google.maps.Polyline({
          map: map.value,
          path: [userPos.value, serverPos.value],
          geodesic: true,
          strokeColor: '#FF0000'
        });
      }

      const bounds = new google.maps.LatLngBounds();

      bounds.extend(userPos.value);
      serverPos && bounds.extend(serverPos.value);

      map.value.fitBounds(bounds);
    });

    return {
      mapDiv,
    };
  },
};
</script>
