<template>
  <form class="new-task-container" @submit.prevent="addTask">
    <input v-model="title" placeholder="New Task" required />
    <button class="btn" type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

const taskStore = useTaskStore();
const userStore = useUserStore();
const title = ref("");

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
    user_id: userStore.user.user.id,
  };

  taskStore.addTask(taskDetails);
  title.value = "";
};
</script>

<style scoped>
.new-task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 25px;
}

input {
  width: 75%;
  padding: 15px;
  border-radius: 20px;
  border-color: #d05f61ab;
}

.btn {
  padding: 10px 15px;
  background-color: #ec999a;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}

.btn:hover {
  background-color: #d05f61;
}

@media (min-width: 768px) {
  .new-task-container {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 20%;
    margin-right: 20px;
  }

  .btn {
    width: auto;
    font-size: 15px;
  }
}
</style>
