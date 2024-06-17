// user.js
import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref();
  const error = ref('');

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
  console.log(supabase.auth)
  const signIn = async (email, password) => {
    try {
      let { user: signedInUser, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      user.value = signedInUser;
    } catch (err) {
      error.value = err.message;
      throw err; 
    }
  };

  return {
    user,
    error, 
    createNewUser,
    signIn,
  };
});