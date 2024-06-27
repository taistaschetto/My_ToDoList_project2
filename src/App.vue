<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
* {
  background-color: #ffd3d469;
  font-family: "Noto Sans";
}
</style>
