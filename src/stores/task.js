import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref, onUnmounted } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select();
    if (error) console.error("Error fetching tasks:", error);
    else tasks.value = data;
  };

  // Function to initiate real-time subscription
  const subscribeToTasks = () => {
    const subscription = supabase
      .from("tasks")
      .on("*", async (payload) => {
        console.log("Change received!", payload);
        await fetchTasks();
      })
      .subscribe();

    // Provide a way to unsubscribe
    onUnmounted(() => {
      supabase.removeSubscription(subscription);
    });
  };

  // Add a new task to Supabase
  const addTask = async (task) => {
    const { data, error } = await supabase.from("tasks").insert([task]);
    if (error) console.error("Error adding task:", error);
    else await fetchTasks(); // Re-fetch tasks to update local state
  };

  // Delete a task from Supabase
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().match({ id });
    if (error) console.error("Error deleting task:", error);
    else await fetchTasks(); // Re-fetch tasks to update local state
  };

  // Modify (update) an existing task in Supabase
  const modifyTask = async (id, updates) => {
    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .match({ id });
    if (error) console.error("Error updating task:", error);
    else await fetchTasks(); // Re-fetch tasks to update local state
  };

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    modifyTask,
    subscribeToTasks,
  };
});
