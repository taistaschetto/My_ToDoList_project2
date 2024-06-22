<template>
  <header class="header">
    <div class="logo">My ToDo List</div>
    <nav>
      <ul>
        <!-- Not logged -->
        <li v-if="!userStore.user" @click="goTo('Home')">Home</li>
        <li v-if="!userStore.user" @click="goTo('Auth')">Sign in / Sign up</li>

        <!-- logged in ÑOT WORKING -->
        <li v-if="userStore.user" @click="signOut">Sign Out</li>
        <li>What's new</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();

const goTo = (routeName) => {
  router.push({ name: routeName });
};

const signOut = async () => {
  await userStore.signOut();
  router.push({ name: "home" });
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.logo {
  font-weight: bold;
}
nav ul {
  list-style: none;
  display: flex;
}
nav ul li {
  margin-left: 20px;
  cursor: pointer;
}
</style>
