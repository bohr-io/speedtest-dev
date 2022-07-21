<script setup lang="ts"></script>

<template>
  <main>
    <nav class="navbar">
      <img src="/src/assets/svg/logo.svg" class="navbar__logo" alt="" />
    </nav>
    <section class="section__block">
      <div class="speed__block">
        <h3>Speed</h3>
      </div>
      <div class="ip__block">
        <div style="display: flex; align-items: center; margin: 8px 0">
          <img src="/src/assets/svg/ip.svg" alt="" />
          <div class="" style="margin-left: 8px">
            <p style="margin: 0; font-size: 13px">Your IP address</p>
            <h3 style="margin: 6px 0; font-size: 17px">192.108.0.1</h3>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin: 8px 0">
          <img src="/src/assets/svg/internet.svg" alt="" />
          <div class="" style="margin-left: 8px">
            <p style="margin: 0 0; font-size: 13px">Your network</p>
            <h3 style="margin: 6px 0; font-size: 17px">Ligga Telecom</h3>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin: 8px 0">
          <img src="/src/assets/svg/marker-orange.svg" alt="" />
          <div class="" style="margin-left: 8px">
            <p style="margin: 0; font-size: 13px">Your location</p>
            <h3 style="margin: 6px 0; font-size: 17px">Passo do Vigário</h3>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin: 8px 0">
          <img src="/src/assets/svg/marker-red.svg" alt="" />
          <div class="" style="margin-left: 8px">
            <p style="margin: 0; font-size: 13px">Server location</p>
            <h3 style="margin: 6px 0; font-size: 17px">Porto Alegre</h3>
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
      <div id="map"></div>
    </section>
    <footer class="navbar">
      <img
        src="/src/assets/svg/footer-logo.svg"
        class="navbar__footer--logo"
        alt=""
      />
    </footer>
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

#map {
  max-width: 100vw;
  height: calc(100vh - 100px);
  z-index: 100;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
}

.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: hsla(25, 85%, 5%, 1);
  padding: 0 16px;
}

.navbar__logo {
  width: 42px;
}

.navbar__footer--logo {
  height: 20px;
  margin-left: auto;
}

.section__block {
  position: relative;
  z-index: 101;
}

.speed__block {
  top: 16px;
  right: 16px;
  position: absolute;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: #f1f1f1;
  display: block;
  z-index: 101;
}

.ip__block {
  bottom: 16px;
  left: 16px;
  position: absolute;
  border-radius: 8px;
  padding: 16px 24px;
  background-color: #f1f1f1;
  display: block;
  z-index: 101;
}
</style>
