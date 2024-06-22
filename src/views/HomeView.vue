<template>
  <div>
    <h1>Welcome to the App!</h1>
    <p>This is your starting point to a great experience. Sign up or log in to get started!</p>
    <router-link to="/auth" class="btn">Get Started</router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
.btn:hover {
  background-color: #0056b3;
}
</style>