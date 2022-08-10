<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<template>
  <main>
    <nav class="navbar">
      <img src="/src/assets/svg/logo.svg" class="navbar__logo" alt="" />
    </nav>

    <section class="section__block">
      <LoadingComponent v-if="isLoading" />
      <div class="speed__block">
        <template v-if="speedBlockLoading">
          <div class="speed__block--loading">
            <img
              src="/src/assets/svg/logo.svg"
              class="speed__block--loading-image"
            />
          </div>
        </template>

        <template v-else>
          <img src="/src/assets/svg/logo.svg" class="speed__block--image" />
          <div class="speed__block--content">
            <div class="speed__block--data">
              <span class="speed__block--data-title">Download:</span>
              <p class="speed__block--data-count">24.2</p>
            </div>
            <div class="speed__block--data">
              <span class="speed__block--data-title">Download:</span>
              <p class="speed__block--data-count">24.2</p>
            </div>
            <div class="speed__block--data">
              <span class="speed__block--data-title">Download:</span>
              <p class="speed__block--data-count">24.2</p>
            </div>
          </div>
        </template>
      </div>
      <div class="ip__block">
        <div class="ip__block--content">
          <img src="/src/assets/svg/ip.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your IP address</p>
            <h3 class="ip__block--data-text">{{ locationData.ip }}</h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/internet.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your network</p>
            <h3 class="ip__block--data-text">{{ locationData.network }}</h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/marker-orange.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your location</p>
            <h3 class="ip__block--data-text orange">
              {{ locationData.userLocation }}
            </h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/marker-red.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Server location</p>
            <h3 class="ip__block--data-text red">
              {{ locationData.serverLocation }}
            </h3>
          </div>
        </div>
      </div>
      <!-- <img
        src="https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDJgsrkslJjQjop3nxhLoRt-XdubE-3_y4&center=-31.713530660697213,-52.39795412801213&zoom=11&format=png&maptype=roadmap&style=color:0x281911&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels%7Ccolor:0x918278%7Cvisibility:simplified&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:administrative.province%7Celement:labels%7Cvisibility:off&style=feature:landscape.man_made%7Ccolor:0x281911&style=feature:landscape.natural%7Celement:geometry.fill%7Ccolor:0x1f130a&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x7a3005&style=feature:road.arterial%7Celement:geometry.stroke%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0x7a3005&style=feature:road.highway%7Celement:geometry.stroke%7Cvisibility:off&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Celement:geometry%7Cvisibility:off&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:geometry.fill%7Ccolor:0x180b02&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=1000x500&scale=2"
        alt=""
        style="
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          margin: 0 auto;
          display: block;
        "
      /> -->
      <MapsComponent :userPosition="userPos" :serverPosition="serverPos" />
    </section>
    <footer class="navbar">
      <img
        src="/src/assets/svg/footer-logo.svg"
        class="navbar__footer--logo"
        alt=""
      />
    </footer>
    <SpeedometerComponent />
  </main>
</template>
<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useGeolocation } from "./useGeolocation.js";
import LoadingComponent from "./components/LoadingComponent.vue";
import MapsComponent from "./components/MapsComponent.vue";
import SpeedometerComponent from "./components/SpeedometerComponent.vue";
export default {
  components: {
    LoadingComponent,
    MapsComponent,
    SpeedometerComponent,
  },

  setup() {
    const isLoading = ref(true);
    const speedBlockLoading = ref(true);
    const locationData = reactive({
      ip: "192.108.0.1",
      network: "Ligga Telecom",
      userLocation: "Passo do Vigário, RS",
      serverLocation: "Porto Alegre, RS",
    });
    const { coords } = useGeolocation();

    const userPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    const serverPos = computed(() => ({
      lat: -30.033056,
      lng: -51.23,
    }));

    return {
      isLoading,
      speedBlockLoading,
      locationData,
      userPos,
      serverPos,
    };
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

    setTimeout(() => {
      this.speedBlockLoading = false;
    }, 5000);
  },

  updated() {
    // console.log(this.userPos, this.styles);
  },
};
</script>
