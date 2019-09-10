<template>
  <div class="locale-changer">
    <b-select id="locale-selector" v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="i">{{
        lang
      }}</option>
    </b-select>
  </div>
</template>

<script lang="ts">
import { i18n } from '@/config.json';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class LocaleChanger extends Vue {
  private langs: any = i18n.locales;
}
</script>