<template>
  <header class="header">
    <img
      src="../assets/Annotation 2024-06-25 192203.png"
      class="logo"
      alt="My ToDo List Logo"
    />
    <router-link to="/" class="title">My ToDo List</router-link>
    <div v-if="!userStore.user" class="nav-placeholder"></div>

    <nav>
      <ul>
        <li class="links signout" v-if="userStore.user" @click="signOut">
          Sign Out
        </li>
        <li v-if="userStore.user">
          <router-link class="links" to="/dashboard">Dashboard</router-link>
        </li>
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
.links {
  font-size: 12px;
  text-decoration: none;
  color: inherit;
}
.signout {
  font-size: 10px;
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
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  gap: 5px;
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
    padding-right: 85px;
  }
  .links {
    font-size: 20px;
  }
  .signout {
    font-size: 17px;
  }
  .title {
    font-size: 50px;
    padding: 0;
  }
  .nav-placeholder {
    width: 145px;
    visibility: hidden;
  }
  nav ul li {
    margin-left: 60px;
  }
}
</style>
