<template>
  <section class="dashboard-container">
    <NewTask />
    <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
      <TaskItem :task="task" :key="task.id" />
    </div>
  </section>
</template>

<script setup>
import NewTask from "@/components/NewTask.vue";
import TaskItem from "@/components/TaskItem.vue";
import { useTaskStore } from "@/stores/task.js";
import { watch } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const taskStore = useTaskStore();

watch(
  () => userStore.user,
  (newValue) => {
    if (newValue) {
      taskStore.fetchTasks();
    } else {
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 5px; 
  padding: 20px;
  width: 100%;
}
</style>