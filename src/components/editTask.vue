<script setup>
    import {useTasksStore} from '../stores/tasks'
    import { ref } from 'vue'
    const store = useTasksStore()
    const TaskName = ref()
    const TaskDescription = ref()
    const TaskCategory = ref('important')
    const TaskTag = ref('')
    const TaskDate = ref('')
    const AddNewTask = () => {
        console.log(TaskName.value, TaskDescription.value, TaskCategory.value, TaskTag.value, TaskDate.value)
        
    }

    const emit = defineEmits(['closeCart'])
    const closeCartF = () =>{
        emit('closeCart', false)
    }
    const editTask = (TaskName, TaskDescription, TaskCategory, TaskTag, TaskDate) => {
      store.editTask(TaskName, TaskDescription, TaskCategory, TaskTag, TaskDate)
      closeCartF()
    }

</script>

<template>
  <!-- Затемнение фона -->
  <div class="fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60"></div>
  
  <!-- Центрированное модальное окно -->
  <div class="fixed inset-0 flex items-center justify-center z-20">
    <div class="bg-white w-full max-w-3xl p-8 shadow-xl relative">
      <!-- Кнопка "Назад" (чистая верстка) -->
      <button class="absolute top-4 left-4 text-gray-600 hover:text-gray-800 cursor-pointer" @click="closeCartF">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
      </button>
      
      <h3 class="text-2xl text-center mb-5">Редактирование задачи</h3>
      <div class="flex justify-between">
        <div class="flex flex-col w-96">
          <input class="tuk p-2 mb-5" style="border: 1px solid black;" type="text" v-model="TaskName" :placeholder="store.getById(store.cur_id).title">
          <textarea class="p-2" style="border: 1px solid black;" :placeholder="store.getById(store.cur_id).description" v-model="TaskDescription"></textarea>
        </div>

        <div class="flex flex-col w-40">
          <select style="border: 1px solid black;" class="p-2 mb-5" v-model="TaskTag">
            <option value="">Все</option>
            <option v-for="tag in store.allTags()" :key="tag" :value="tag">{{ tag }}</option>
          </select>
          <select style="border: 1px solid black;" class="p-2 mb-5" v-model="TaskCategory">
            <option value="quick">Срочно</option>
            <option value="important">Важно</option>
            <option value="just">Подождёт</option>
          </select>
          <input style="border: 1px solid black;" class="p-2 mb-7" type="date" placeholder="Дедлайн" v-model="TaskDate">
        </div>
      </div>

      <a href="#" class="block text-white w-40 py-2 text-center m-auto" style="background-color: #E5662F;" @click="editTask(TaskName, TaskDescription, TaskCategory, TaskTag, TaskDate)">СОХРАНИТЬ</a>
    </div>
  </div>
</template>

<style scoped>

.tuk:active {
  border-radius: 0;
}
</style>