<template>
  <div class="auth-container">
    <h2>{{ isSigningUp ? "Sign Up" : "Sign In" }}</h2>
    <form @submit.prevent="isSigningUp ? signUp() : signIn()">
      <input type="email" v-model="email" placeholder="Email" required />
      <span v-if="email && !validEmail(email)" class="error">
        Please enter a valid email address.
      </span>

      <input
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
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <span v-if="password !== confirmPassword" class="error">
          Passwords do not match.
        </span>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button type="submit" :disabled="loading.value">
        {{
          loading.value
            ? "Processing..."
            : isSigningUp.value
            ? "Create Account"
            : "Log In"
        }}
      </button>
    </form>

    <button @click="toggleMode">
      {{
        isSigningUp
          ? "Already have an account? Sign In."
          : "No account? Sign Up."
      }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSigningUp = ref(false);
const userStore = useUserStore();
const error = ref("");
const loading = ref(false);

const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const toggleMode = () => {
  isSigningUp.value = !isSigningUp.value;
  error.value = "";
};

// Sign Up function
const signUp = async () => {
  loading.value = true;
  error.value = "";
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters long.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }
  try {
    const { error: signUpError } = await userStore.createNewUser(
      email.value,
      password.value
    );
    if (signUpError) {
      error.value = signUpError.message;
    } else {
      error.value = "Account created successfully. Please sign in.";
    }
  } catch (e) {
    error.value = "An unexpected error occurred.";
  }

  loading.value = false;
};

const signIn = async () => {};
</script>

<style scoped>
.error {
  color: red;
}
</style>
