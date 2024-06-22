<template>
  <div>
    <div v-if="isEditing">
      <input type="text" v-model="editTitle" placeholder="Title" />
      <input type="text" v-model="editDescription" placeholder="Description" />
      <button @click="saveTask">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <div v-else>
      <input type="checkbox" v-model="task.completed" @change="toggleTaskCompletion">
      {{ task.title }} - {{ task.description }}
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="enableEdit">Edit</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useTaskStore } from '@/stores/task';

const props = defineProps({
  task: Object,
});
const store = useTaskStore();
const isEditing = ref(false);
const editTitle = ref('');
const editDescription = ref('');

const enableEdit = () => {
  isEditing.value = true;
  editTitle.value = props.task.title; 
  editDescription.value = props.task.description; 
};

const saveTask = async () => {
  await store.modifyTask(props.task.id, { title: editTitle.value, description: editDescription.value });
  isEditing.value = false;
};

const toggleTaskCompletion = () => {
  store.modifyTask(props.task.id, { completed: !props.task.completed });
};

const cancelEdit = () => {
  isEditing.value = false; 
};

const deleteTask = (id) => {
  store.deleteTask(id);
};
</script>