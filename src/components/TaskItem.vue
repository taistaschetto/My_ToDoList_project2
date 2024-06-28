<template>
  <div class="items-container">
    <div v-if="isEditing">
      <input
        class="input task-item"
        type="text"
        v-model="editTitle"
        placeholder="Title"
      />
      <button class="btn" @click="saveTask">Save</button>
      <button class="btn" @click="cancelEdit">Cancel</button>
    </div>
    <div v-else class="task-item" :class="{ completed: task.is_complete }">
      <input class="checkbox"
        type="checkbox"
        :checked="task.is_complete"
        @click="toggleTaskCompletion"
      />
      <span class="task-text">{{ task.title }}</span>
      <div class="task-actions">
        <button class="btn" @click="enableEdit">Edit</button>
        <button class="btn" @click="deleteTask(task.id)">Delete</button>
      </div>
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
  const newCompletionStatus = !props.task.is_complete;
  props.task.is_complete = newCompletionStatus;

  try {
    await store.modifyTask(props.task.id, {
      is_complete: newCompletionStatus,
    });
  } catch (error) {
    console.error("Failed to toggle task completion:", error);
    props.task.is_complete = !newCompletionStatus;
  }
};
const cancelEdit = () => {
  isEditing.value = false;
};

const deleteTask = async (id) => {
  store.deleteTask(id);
};
</script>

<style scoped>
.items-container{
  display: flex;
}
.btn {
  background-color: #ec999a;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  padding: 0px 10px;
  margin-left: 10px;
  font-size: 10px;
}

.btn:hover {
  background-color: #d05f61;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  width: calc(100% - 20px); 
  padding: 10px;
  border-radius: 10px;
  margin-left: 4.5vw;
  font-size: 15px;
  gap: 10px;
  flex-wrap: wrap; 
  position: relative; 


}

/* .task-item::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 5px; 
  transform: translateX(-50%); 
  width: 75vw; 
  height: 2px; 
  background: #d05f61ab 
}
 */
.task-text {
  flex-grow: 1; 
  flex-shrink: 1;
  min-width: 0; 
  word-wrap: break-word; 
  margin-right: auto;
}

.completed {
  text-decoration: line-through double;
  color: #757070;
}


@media (min-width: 600px) {
  .task-item {
    font-size: 20px;
    justify-content: flex-start;
    margin-left: 30vw;
    width: 100%;

  }
  .task-item::after {
    width: 70vw;
  }
  .btn {
    font-size: 12px;
    padding: 0px 12px;
  }

  .checkbox{
  margin-top: 8px;
}
}

</style>
