<template>
  <div class="welcome-container">
    <h1 class="h1">Welcome to the App!</h1>
    <p class="p">
      This is your starting point to a great experience. <br />
      Sign up or log in to get started!
    </p>
    <router-link to="/auth" class="btn">Get Started</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
}

.h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.p {
  font-size: 1rem;
}

.btn {
  padding: 10px 15px;
  background-color: #ec999a;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
}

.btn:hover {
  background-color: #d05f61;
}

@media (min-width: 600px) {
  .h1 {
    font-size: 3rem;
  }

  .p {
    font-size: 1.2rem;
  }

  .btn {
    padding: 20px 30px;
    font-size: 1.2rem;
  }
}
</style>
