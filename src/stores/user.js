import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref();

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) console.log("error: ", error);
    else user.value = data;
    console.log("user :", user.value);
  };

  const signIn = async (email, password) => {
    const { user: signedInUser, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      console.log("sign in error: ", error);
      throw error; 
    } else {
      user.value = signedInUser;
      console.log("user signed in: ", user.value);
    }
  };

  return {
    user,
    createNewUser,
    signIn,
  };
});
