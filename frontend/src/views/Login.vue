<template>
  <div class="app flex-row align-items-center">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <loginForm />
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import LoginForm from '../components/LoginForm.vue';
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {}
</script>
