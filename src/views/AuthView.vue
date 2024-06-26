<template>
  <div class="auth-container">
    <h2 class="auth-title">{{ isSigningUp ? "Sign Up" : "Sign In" }}</h2>
    <form @submit.prevent="isSigningUp ? signUp() : signIn()">
      <input
        class="input"
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <span v-if="email && !validEmail(email)" class="error">
        Please enter a valid email address.
      </span>

      <input
        class="input"
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <span v-if="password.length > 0 && password.length < 6" class="error">
        Password must be at least 6 characters long.
      </span>

      <div v-if="isSigningUp">
        <input
          class="input"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <span v-if="password !== confirmPassword" class="error">
          Passwords do not match.
        </span>
      </div>

      <div v-if="localError" class="error">{{ localError }}</div>
      <button
        class="btn login"
        v-if="!isSigningUp"
        type="submit"
        :disabled="loading.value"
      >
        Log In
      </button>
    </form>

    <button
      class="btn"
      v-if="isSigningUp"
      type="submit"
      :disabled="loading.value"
      @click="signUp"
    >
      Create Account
    </button>

    <button class="btn" @click="toggleMode">
      {{
        isSigningUp
          ? "Already have an account? Sign In."
          : "No account? Sign Up."
      }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSigningUp = ref(false);
const userStore = useUserStore();
const router = useRouter();
const localError = ref("");
const loading = ref(false);

const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const toggleMode = () => {
  isSigningUp.value = !isSigningUp.value;
  localError.value = "";
};

watch(
  () => userStore.error,
  (newError) => {
    localError.value = newError;
  }
);

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    localError.value = "Passwords do not match.";
    return;
  }
  loading.value = true;
  try {
    await userStore.createNewUser(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    localError.value = error.message;
  } finally {
    loading.value = false;
  }
};

const signIn = async () => {
  loading.value = true;
  try {
    await userStore.signIn(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    localError.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
}
.error {
  color: red;
}
.input {
  border-radius: 5px;
  margin-left: 70px;
  padding: 10px;
}
.input:focus {
  border-color: #b32225;
}
.btn {
  padding: 10px 15px;
  background-color: #ec999a;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
}

.login {
  margin-left: 120px;
}

.btn:hover {
  background-color: #d05f61;
}

@media (min-width: 768px) {
  .auth-title {
    font-size: 30px;
  }
  .input,
  .btn {
    max-width: 400px;
    margin: 15px;
  }
}
</style>
