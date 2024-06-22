<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="Title" required />
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { useUserStore } from '@/stores/user'; 

const taskStore = useTaskStore();
const userStore = useUserStore(); 
const title = ref('');

const addTask = () => {
  if (!title.value.trim()) {
    alert("Title is required.");
    return;
  }
  if (!userStore.user.user.id) {
    alert("Please log in to add tasks.");
    return;
  }

  const taskDetails = { 
    title: title.value, 
    user_id: userStore.user.user.id 
  };

  taskStore.addTask(taskDetails);
  title.value = ''; 
};
</script>
