<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { BvModalEvent, BvEvent } from 'bootstrap-vue';
import { Component } from 'vue-property-decorator';


@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
