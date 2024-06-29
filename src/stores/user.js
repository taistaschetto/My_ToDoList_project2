import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const error = ref("");

  const createNewUser = async (email, password) => {
    try {
      let { user: newUser, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      user.value = newUser;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      user.value = null;
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      user.value = data;
      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (error) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  };

  return {
    user,
    error,
    createNewUser,
    signIn,
    signOut,
  };
});
