<template>
  <div class="auth-container">
    <h2>{{ isSigningUp ? "Sign Up" : "Sign In" }}</h2>
    <form @submit.prevent="isSigningUp ? signUp() : signIn()">
      <!-- Email Field -->
      <input type="email" v-model="email" placeholder="Email" required />

      <!-- Password Field -->
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <span v-if="password.length > 0 && password.length < 6" class="error">
        Password must be at least 6 characters long.
      </span>

      <!-- Confirm Password Field (shown only when signing up) -->
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

      <!-- Error Message Display -->
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Submit Button -->
      <button type="submit">
        {{ isSigningUp ? "Create Account" : "Log In" }}
      </button>
    </form>

    <!-- Toggle Mode Button -->
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

// Toggle between Sign In and Sign Up mode
const toggleMode = () => {
  isSigningUp.value = !isSigningUp.value;
  error.value = ""; // Reset error message on mode change
};

// Sign Up function
const signUp = async () => {
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
      error.value = "";
      // Maybe redirect to dashboard or show success message
    }
  } catch (e) {
    error.value = "An unexpected error occurred.";
  }
};

// Placeholder Sign In function
const signIn = async () => {
  // Implementation for signing in
};
</script>

<style scoped>
.error {
  color: red;
}
/* Add more styling as needed */
</style>
