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
    >{{ $t('offline.message') }}</b-toast>
  </div>
</template>

<script lang="ts">
import Offline from './views/Offline.vue';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    Offline
  }
})
export default class App extends Vue {
  get online(): boolean {
    return this.$store.state.app.online;
  }
  get locale(): string {
    return this.$i18n.locale;
  }
  public checkConnection() {
    if (this.online === false) {
      this.$bvToast.show('offline-toast');
    } else {
      this.$bvToast.hide('offline-toast');
    }
  }
  private loadLocale() {
    const persistedLocale = localStorage.getItem('locale');
    if (persistedLocale) {
      this.$i18n.locale = persistedLocale;
    }
  }
  private async initBackendConnection() {
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
    setTimeout(() => {
      this.checkConnection();
    }, 1000);
  }
  private async mounted() {
    this.loadLocale();
    await this.initBackendConnection();
  }
  @Watch('online')
  public OnOnlineChange() {
    this.checkConnection();
  }
  @Watch('locale(newValue)')
  public OnLocaleChange() {
    localStorage.setItem('locale', this.locale);
  }
}
</script>

<style lang="scss">
@import 'assets/style.scss';

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
