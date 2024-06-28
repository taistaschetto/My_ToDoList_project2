<template>
  <header class="header">
    <img
      src="../assets/Annotation 2024-06-25 192203.png"
      class="logo"
      alt="My ToDo List Logo"
    />
    <router-link to="/" class="title">My ToDo List</router-link>
    <nav>
      <ul>
        <li class="signout" v-if="userStore.user" @click="signOut">Sign Out</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();

const signOut = async () => {
  await userStore.signOut();
  router.push({ name: "Home" });
};
</script>

<style scoped>
.header {
  background-color: #ffd3d4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.signout{
  font-size: 12px;
}
.logo {
  width: 60px;
}
.title {
  margin: 0 auto;
  text-decoration: none;
  color: #000000;
  font-size: 8vw;
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
@media (min-width: 600px) {
  .logo {
    width: 60px;
  }
  .signout{
  font-size: 20px;
}
  .title {
    font-size: 50px;
    padding: 0;
    margin: 0;
  }
  nav ul li {
    margin-left: 60px;
  }
}
</style>
