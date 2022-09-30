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
          <button class="speed__block--refresh" @click.prevent="restartTest()">
            <img src="/src/assets/svg/refresh.svg" alt="" />
          </button>
          <SpeedometerComponent class="speed__block--image" :speedRate="+speedTest.download" />
          <div class="speed__block--content">
            <div class="speed__block--data">
              <span
                v-tooltip="{
                  content: downloadText,
                  placement: 'bottom',
                }"
                class="speed__block--data-title"
              >
                Download:
              </span>
              <p class="speed__block--data-count">
                {{ speedTest.download }}
                <span style="font-size: 11px">Mbps</span>
              </p>
            </div>
            <div class="speed__block--data">
              <span
                class="speed__block--data-title"
                v-tooltip="{
                  content: uploadText,
                  placement: 'bottom',
                }"
                >Upload:</span
              >
              <p class="speed__block--data-count">
                {{ speedTest.upload }}
                <span style="font-size: 11px">Mbps</span>
              </p>
            </div>
            <div class="speed__block--data">
              <span
                class="speed__block--data-title"
                v-tooltip="{
                  content: pingText,
                  placement: 'bottom',
                }"
                >Ping:</span
              >
              <p class="speed__block--data-count">
                {{ speedTest.ping }}
                <span style="font-size: 11px">ms</span>
              </p>
            </div>
          </div>
        </template>
      </div>
      <div class="ip__block">
        <div class="ip__block--content">
          <img src="/src/assets/svg/ip.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your IP address</p>
            <h3
              v-if="locationData.ip"
              class="ip__block--data-text fade-in-left"
            >
              {{ locationData.ip }}
            </h3>
            <h3
              v-else
              class="ip__block--data-text ip__block--data-loading fade-in-left"
            ></h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/internet.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your network</p>
            <h3
              v-if="locationData.network"
              class="ip__block--data-text fade-in-left"
            >
              {{ locationData.network }}
            </h3>
            <h3
              v-else
              class="ip__block--data-text ip__block--data-loading fade-in-left"
            ></h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/marker-orange.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Your location</p>
            <h3
              v-if="locationData.userLocation"
              class="ip__block--data-text orange fade-in-left"
            >
              {{ locationData.userLocation }}
            </h3>
            <h3
              v-else
              class="ip__block--data-text ip__block--data-loading fade-in-left"
            ></h3>
          </div>
        </div>
        <div class="ip__block--content">
          <img src="/src/assets/svg/marker-red.svg" alt="" />
          <div class="ip__block--data">
            <p class="ip__block--data-title">Server location</p>
            <h3
              v-if="locationData.serverLocation"
              class="ip__block--data-text red fade-in-left"
            >
              {{ locationData.serverLocation }}
            </h3>
            <h3
              v-else
              class="ip__block--data-text ip__block--data-loading fade-in-left"
            ></h3>
          </div>
        </div>
      </div>
      <MapsComponent v-if="userPos.lat && userPos.lng" :userPosition="userPos" :serverPosition="serverPos" />
    </section>
    <footer class="navbar">
      <img src="/src/assets/svg/footer-logo.svg" class="navbar__footer--logo" />
    </footer>
  </main>
</template>
<script>
import { ref, reactive, computed } from "vue";
import speedTestService from "./speedTest";
// import { useGeolocation } from "./useGeolocation.js";
import LoadingComponent from "./components/LoadingComponent.vue";
import MapsComponent from "./components/MapsComponent.vue";
import SpeedometerComponent from "./components/SpeedometerComponent.vue";
import cfDataCenters from './assets/json/cfDataCenters.json';
export default {
  components: {
    LoadingComponent,
    MapsComponent,
    SpeedometerComponent,
  },

  setup() {
    const service = new speedTestService();
    const speedTest = reactive({
      download: "",
      upload: "",
      ping: "",
    });
    const isLoading = ref(true);
    const speedBlockLoading = ref(true);
    const locationData = reactive({
      ip: "",
      network: "",
      userLocation: "",
      serverLocation: "",
    });

    const downloadText = ref(
      "Mensura a velocidade média da sua internet durante o processo de recebimento de dados. Na maioria dos casos, a velocidade de download é a mais importante, uma vez que grande parte dos usuários recebe mais dados do que envia. É ela quem irá ditar a velocidade de carregamento de vídeos, mensagens, serviços de streaming, entre outros."
    );

    const uploadText = ref(
      "Mensura a velocidade média da sua internet durante o processo de envio de dados. A velocidade de upload é pouco utilizada pela maioria dos usuários. Ela é importante para atividades específicas, como subir um programa para a internet, fazer backup de arquivos na nuvem ou postar um vídeo no Youtube."
    );

    const pingText = ref(
      "Também conhecido como teste de latência, o primeiro dado a ser mensurado no velocímetro é o ping, importantíssimo para usuários que precisam de conexões estáveis. Essa informação ajuda a avaliar a estabilidade da sua conexão, contabilizando o tempo que leva para que um pacote de dados percorra o trajeto de ida e volta do computador de origem ao do servidor de destino."
    );

    // const { coords } = useGeolocation();

    const userPos = reactive({
      lat: undefined,
      lng: undefined
    });

    const serverPos = reactive({
      lat: undefined,
      lng: undefined
    });

    return {
      service,
      speedTest,
      isLoading,
      speedBlockLoading,
      locationData,
      userPos,
      serverPos,
      downloadText,
      uploadText,
      pingText,
    };
  },

  async mounted() {
    this.service.addressSpeed().then((data) => {
      const serverLocation = cfDataCenters[data.colo];
      this.locationData = {
        ip: data.remoteAddress,
        network: data.asOrganization,
        userLocation: `${data.city}, ${data.region}`,
        serverLocation: serverLocation ? `${serverLocation.city}, ${serverLocation.country}` : data.colo,
      }
      this.userPos = {
        lat: +data.latitude,
        lng: +data.longitude,
      }
      this.serverPos = serverLocation ? {
        lat: serverLocation.lat,
        lng: serverLocation.lon,
      } : undefined;
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
    this.isLoading = false;
    this.startSpeedTest();
  

    // setTimeout(() => {
    //   this.locationData = {
    //     ip: "192.108.0.1",
    //     network: "Ligga Telecom",
    //     userLocation: "Passo do Vigário, RS",
    //     serverLocation: "Porto Alegre, RS",
    //   };
    // }, 5000);

    // setTimeout(async () => {
    //   this.speedBlockLoading = false;
    //   this.speedTest = {
    //     download: "24.2",
    //     upload: "14.3",
    //     ping: "20.4",
    //   };
    // }, 7000);    
  },

  updated() {
    // console.log(this.userPos, this.styles);
  },

  methods: {
    restartTest() {
      this.service.abortController.abort();
      this.service.abortController = new AbortController();
      this.speedBlockLoading = true;
      this.startSpeedTest();
    },
    async startSpeedTest() {      
      this.speedBlockLoading = false;
      this.speedTest = {
        download: "",
        upload: "",
        ping: "",
      };
      this.$forceUpdate();
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.speedTest.ping = await this.service.testPingSpeed();
      this.$forceUpdate();
      this.startDownloadUploadTest();
    },
    async startDownloadUploadTest() {
      await new Promise(resolve => setTimeout(resolve, 3000));
      // 100 kB
      this.speedTest.download = await this.service.testDownloadSpeed(100000);
      this.$forceUpdate();
      this.speedTest.upload = await this.service.testUploadSpeed(100000);
      this.$forceUpdate();

      await new Promise(resolve => setTimeout(resolve, 100));
      // 1 MB
      this.speedTest.download = await this.service.testDownloadSpeed(1000000);
      this.$forceUpdate();
      this.speedTest.upload = await this.service.testUploadSpeed(1000000);
      this.$forceUpdate();

      await new Promise(resolve => setTimeout(resolve, 100));
      // 10 MB
      this.speedTest.download = await this.service.testDownloadSpeed(10000000);
      this.$forceUpdate();
      this.speedTest.upload = await this.service.testUploadSpeed(10000000);
      this.$forceUpdate();

      await new Promise(resolve => setTimeout(resolve, 100));
      // 25 MB
      this.speedTest.download = await this.service.testDownloadSpeed(25000000);
      this.$forceUpdate();
      this.speedTest.upload = await this.service.testUploadSpeed(25000000);
      this.$forceUpdate();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      // 100 MB
      this.speedTest.download = await this.service.testDownloadSpeed(100000000);
      this.$forceUpdate();
      
      return true;
    }
  },
};
</script>
<style>
.v-popper--theme-tooltip .v-popper__inner {
  background: #f6ae2d !important;
  color: black !important;
  /* padding: 24px; */
  border-radius: 6px;
  /* border: 1px solid #ddd; */
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  max-width: 400px;
  white-space: pre-line;
}
.v-popper--theme-tooltip .v-popper__arrow-outer {
  border-color: #f6ae2d !important;
}
</style>
