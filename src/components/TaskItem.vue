<template>
  <div>
    <div v-if="isEditing">
      <input type="text" v-model="editTitle" placeholder="Title" />
      <button @click="saveTask">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <div v-else>
      <input
        type="checkbox"
        v-model="task.is_complete"
        @change="toggleTaskCompletion"
      />
      {{ task.title }}
      <button @click="deleteTask(task.id)">Delete</button>
      <button @click="enableEdit">Edit</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useTaskStore } from "@/stores/task";

const props = defineProps({
  task: Object,
});
const store = useTaskStore();
const isEditing = ref(false);
const editTitle = ref("");

const enableEdit = () => {
  isEditing.value = true;
  editTitle.value = props.task.title;
};

const saveTask = async () => {
  await store.modifyTask(props.task.id, {
    title: editTitle.value,
  });
  isEditing.value = false;
};

const toggleTaskCompletion = async () => {
  store.modifyTask(props.task.id, { is_complete: !props.task.is_complete });
};

const cancelEdit = () => {
  isEditing.value = false;
};

const deleteTask = async (id) => {
  store.deleteTask(id);
};
</script>


<style scoped>
.completed {
  text-decoration: line-through;
  color: #b3b3b3; 
}
</style>