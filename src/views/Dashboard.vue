<template>
  <section>
    <NewTask />
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <TaskItem :task="task" />
    </div>
  </section>
</template>

<script setup>
import NewTask from "@/components/NewTask.vue";
import TaskItem from "@/components/TaskItem.vue";
import { useTaskStore } from "@/stores/task.js";
import { onMounted } from "vue";

const taskStore = useTaskStore();
onMounted(() => {
  taskStore.fetchTasks();
  taskStore.subscribeToTasks();
});
const tasks = taskStore.tasks;
</script>
