<script setup>
import { ref, onMounted } from 'vue';
import { useTasksStore } from './stores/tasks'
import newTask from './components/newTask.vue'
import notificationModal from './components/notificationModal.vue'
const store = useTasksStore()
const formattedDate = ref('')
const dayOfWeek = ref('')

onMounted(async () => {
  await store.getAllTasks();
  console.log(store.getMaxTimeTask)
  const now = new Date();
  
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  formattedDate.value = `${day}/${month}/${year}`;

  const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  dayOfWeek.value = daysOfWeek[now.getDay()];
});

store.allTags()
console.log(store.getOverdueTasks())
</script>

<template>
<div class="w-5/6 m-auto ">

  <header style="border-bottom: 2px solid #E5662F; padding-top: 35px; padding-bottom: 5px;" class="flex justify-between items-end mb-8">
    <router-link to="/"><h2 class="logo uppercase text-3xl">your planner</h2></router-link>

    <div class="flex items-center gap-5">
      <p class="text-2xl">{{ formattedDate }} {{ dayOfWeek }}</p>

      <router-link to="/profile"> <p><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_4_13)">
        <path d="M25 25C29.6042 25 33.3334 21.2708 33.3334 16.6667C33.3334 12.0625 29.6042 8.33334 25 8.33334C20.3959 8.33334 16.6667 12.0625 16.6667 16.6667C16.6667 21.2708 20.3959 25 25 25ZM25 29.1667C19.4375 29.1667 8.33337 31.9583 8.33337 37.5V41.6667H41.6667V37.5C41.6667 31.9583 30.5625 29.1667 25 29.1667Z" fill="#1F3C5A"/>
        </g>
        <defs>
        <clipPath id="clip0_4_13">
        <rect width="50" height="50" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    </p></router-link>
    </div>
  </header>



  <RouterView />
</div>



</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
  *{
    font-family: "Didact Gothic", sans-serif;
    color: #1F3C5A
  }
  .logo{
    font-family: "Bebas Neue", sans-serif;
  }
</style>
