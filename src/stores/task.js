import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref, onUnmounted } from "vue";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  // Fetch tasks
  const fetchTasks = async () => {
    const userStore = useUserStore();

    if (!userStore.user.value) {
      console.error("No user logged in");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userStore.user.value.id); // ensure user_id is used correctly in your tasks table

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    tasks.value = data;
  };

  

  // Add a new task
  const addTask = async (task) => {
    const { error } = await supabase.from("tasks").insert([task]);
    if (error) {
      console.error("Error adding task:", error);
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
