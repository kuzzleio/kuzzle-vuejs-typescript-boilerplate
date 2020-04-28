<template>
  <div id="app">
    <router-view v-if="!$store.state.app.waitingForConnection" />
    <offline v-else />
    <b-toast
      id="offline-toast"
      :title="$t('offline.title')"
      no-auto-hide
      no-close-button
      variant="warning"
      toaster="b-toaster-bottom-right"
      append="true"
    >
      {{ $t('offline.message') }}
    </b-toast>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Offline from './views/Offline.vue';

export default Vue.extend({
  name: 'App',
  computed: {
    online(): boolean {
      return this.$store.state.app.online;
    },
    locale(): string {
      return this.$i18n.locale;
    }
  },
  components: {
    Offline
  },
  methods: {
    checkConnection() {
      if (this.online === false) {
        this.$bvToast.show('offline-toast');
      } else {
        this.$bvToast.hide('offline-toast');
      }
    },
    loadLocale() {
      const persistedLocale = localStorage.getItem('locale');
      if (persistedLocale) {
        this.$i18n.locale = persistedLocale;
      }
    },
    async initBackendConnection() {
      this.$kuzzle.addListener('connected', () => {
        this.$store.commit('app/SET_ONLINE');
      });
      this.$kuzzle.addListener('reconnected', () => {
        this.$store.commit('app/SET_ONLINE');
      });
      this.$kuzzle.addListener('disconnected', () => {
        this.$store.commit('app/SET_OFFLINE');
      });
      this.$kuzzle.addListener('tokenExpired', () => {
        this.$store.dispatch('auth/LOG_OUT');
        this.$router.push({ name: 'login' });
      });

      await this.$kuzzle.connect();
      // Avoids showing the toast as soon as the app loads
      setTimeout(() => {
        this.checkConnection();
      }, 1000);
    }
  },
  async mounted() {
    this.loadLocale();
    await this.initBackendConnection();
  },
  watch: {
    locale(newValue) {
      if (newValue) {
        localStorage.setItem('locale', this.locale);
      }
    },
    online: {
      immediate: false,
      handler() {
        this.checkConnection();
      }
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
