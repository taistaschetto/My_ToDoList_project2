<template>
  <header class="header">
    <img
      src="../assets/src/assets/33618b092718aa8ff66fbafd08bf2cc7.jpg"
      class="logo"
      alt="My ToDo List Logo"
    />
    <router-link to="/" class="title">My ToDo List</router-link>
    <nav>
      <ul>
        <!-- Not logged -->
        <!-- <li v-if="!userStore.user" @click="goTo('Auth')">Sign in / Sign up</li> -->

        <!-- logged in-->
        <li v-if="userStore.user" @click="signOut">Sign Out</li>
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
  router.push({ name: "Home" });
};
</script>

<style scoped>

@media (min-width: 600px) {
  .logo {
    width: 80px; /* Larger logo for desktop */
  }
  /* Increase font size or padding as needed for desktop view */
  .title {
    font-size: 24px; /* Example adjustment */
  }
  nav ul li {
    margin-left: 40px; /* More space between nav items */
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff; /* Example background color */
}
.logo {
  width: 50px; /* Adjust as necessary */
}
.title {
  margin: 0 auto;
  text-decoration: none;
  color: #333; /* Adjust font color as needed */
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
nav ul li {
  margin-left: 20px;
  cursor: pointer;
}
/* Style for screens wider than 600px */
@media (min-width: 600px) {
  /* Adjust styles for bigger screens here */
}
</style>
