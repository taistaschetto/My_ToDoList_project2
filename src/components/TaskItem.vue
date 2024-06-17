<template>
    <div>
      <input type="checkbox" v-model="task.completed" @change="toggleTaskCompletion">
      {{ task.title }} - {{ task.description }}
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="editTask(task.id)">Edit</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, } from 'vue';
  import { useTaskStore } from '@/stores/task';
  
  const props = defineProps({
    task: Object,
  });
  
  const store = useTaskStore();
  
  const toggleTaskCompletion = () => {
    store.modifyTask({...props.task, completed: !props.task.completed});
  };
  
  const deleteTask = (id) => {
    store.deleteTask(id);
  };
  </script>