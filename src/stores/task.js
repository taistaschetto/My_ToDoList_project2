import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  // Fetch
  const fetchTasks = async () => {
    const userStore = useUserStore();

    if (!userStore.user) {
      console.log(userStore.user.user.id);
      console.error("No user logged in");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userStore.user.user.id);

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    tasks.value = data.sort((a, b) => a.is_complete - b.is_complete);

  };

  // Add
  const addTask = async (taskDetails) => {
    const { error } = await supabase.from("tasks").insert([taskDetails]);
    if (error) {
      console.error("Failed to add task:", error.message);
      return;
    }
    await fetchTasks();
  };

  // Delete
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().match({ id });
    if (error) console.error("Error deleting task:", error);
    else await fetchTasks();
  };

  // Modify
  const modifyTask = async (id, updates) => {
    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .match({ id });
    if (error) console.error("Error updating task:", error);
    else await fetchTasks();
  };

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    modifyTask,
  };
});
