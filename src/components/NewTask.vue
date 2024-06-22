<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="Title" required />
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";

const title = ref("");
const description = ref("");
const store = useTaskStore();

const addTask = () => {
  if (title.value.trim()) {
    store.addTask({ title: title.value, description: description.value });
    title.value = "";
    description.value = "";
  }
};
</script>
