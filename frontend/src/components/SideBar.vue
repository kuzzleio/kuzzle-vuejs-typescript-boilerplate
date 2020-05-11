<template>
  <b-sidebar
    id="sidebar"
    width="250px"
    bg-variant="dark"
    text-variant="light"
    shadow
  >
    <b-nav class="flex-column">
      <b-nav-item
        link-classes="pl-0"
        class="text-left"
        v-for="(item, index) in navItems"
        :key="index"
        :href="item.url"
      >
        <i :class="`${item.icon} navbar-text-color`"></i>
        {{ item.name }}
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class SlideBar extends Vue {
  get navItems() {
    return [
      {
        name: this.$t('sidebar.title-1'),
        url: '/',
        icon: 'fas fa-home'
      }
    ];
  }
}
</script>
