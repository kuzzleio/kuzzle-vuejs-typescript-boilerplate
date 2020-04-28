<template>
  <b-form @submit.prevent="login">
    <h1>{{ $t('login.title') }}</h1>
    <p class="text-muted">{{ $t('login.subtitle') }}</p>
    <b-input-group class="mb-3">
      <b-input-group-prepend>
        <b-input-group-text>
          <i class="fa fa-user"></i>
        </b-input-group-text>
      </b-input-group-prepend>
      <b-form-input
        v-model="username"
        type="text"
        class="form-control"
        data-cy="username"
        :placeholder="$t('login.usernamePlaceholder')"
        autocomplete="username email"
      />
    </b-input-group>
    <b-input-group class="mb-4">
      <b-input-group-prepend>
        <b-input-group-text>
          <i class="fa fa-lock"></i>
        </b-input-group-text>
      </b-input-group-prepend>
      <b-form-input
        v-model="password"
        type="password"
        class="form-control"
        data-cy="password"
        :placeholder="$t('login.passwordPlaceholder')"
        autocomplete="current-password"
      />
    </b-input-group>
    <b-row>
      <b-col cols="2">
        <b-button variant="primary" class="px-4" data-cy="submit" type="submit">
          {{ $t('login.submitLabel') }}
        </b-button>
      </b-col>
      <b-col cols="6" offset="4">
        <b-form-group
          horizontal
          :label-cols="4"
          :label="$t('common.language')"
          label-for="locale-selector"
        >
          <locale-changer />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div v-if="this.errorMessage" class="alert alert-danger" role="alert">
          {{ translatedError }}
        </div>
      </b-col>
    </b-row>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LocaleChanger from './LocaleChanger.vue';

@Component({
    components: {LocaleChanger}
})
export default class LoginForm extends Vue {
  private username: string = '';
  private password: string = '';
  private errorMessage: string = '';

  private async login(): Promise<any> {
    const credentials = { username: this.username, password: this.password };
    this.setErrorMessage('');

    this.$store
      .dispatch('auth/LOGIN', { credentials, kuzzle: this.$kuzzle })
      .then(() => {
        if (this.$route.query.to) {
          this.$router.push({ name: this.$route.query.to as string});
          return;
        }
        this.$router.push('/');
      })
      .catch(error => {
        this.setErrorMessage(error.message);
      });
  }

  private setErrorMessage(errorMessage): void {
    this.errorMessage = errorMessage;
  }

  get translatedError() {
    if (this.errorMessage.match(/wrong.*username.*password/)) {
        return this.$t('login.errors.badCredentials');
      }
      if (this.errorMessage.match(/Missing.*credentials/)) {
        return this.$t('login.errors.missingCredentials');
      }
      if (this.errorMessage.match(/.*not connected to.*/)) {
        return this.$t('login.errors.notConnected');
      }
      this.$log.error(this.errorMessage);
      return this.$t('login.errors.generic');
  }


  
}

</script>

<style scoped lang="scss">
.alert {
  margin-top: 2em
}
</style>
