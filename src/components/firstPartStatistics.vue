<script setup>
import { useTasksStore } from "@/stores/tasks";
import { ref, onMounted } from "vue";

const store = useTasksStore();
const overdueCount = ref(0);
const averageTime = ref(0);
const loading = ref(true);

onMounted(async () => {
  const tasks = await store.getOverdueTasks();
  overdueCount.value = tasks.length;
  averageTime.value = await store.getAverageCompletionTime();
  loading.value = false;
});
</script>
<template>
    <div>
        <div class="flex justify-between pr-80">
            <div class="text-xl">
                <h2 class="title text-2xl inline">Общая</h2>
                <p>Всего задач: {{ store.all_all_tasks.length }}</p>
                <p>Выполнено: {{ Math.round(store.getPercent()) }}%</p>
                <p>Просрочено: {{ Math.round(overdueCount / store.all_all_tasks.length * 100) }}%</p>
                <p>Среднее время выполнения: {{ averageTime }} ч.</p>
            </div>
            <div class="text-xl">
                <h2 class="title text-2xl inline">По тегам</h2>
                <div class="flex gap-2 mt-2">
                    <p>Учёба: </p>
                    <div class="bl-height py-1"
                    :style="{ width: `${(store.getByTag('учеба').length/store.all_tasks.length * 400)}px` }"></div>
                    <p>{{ Math.round(store.getByTag('учеба').length/store.all_tasks.length * 100) }}%</p>
                    
                </div>
                
                <div class="flex gap-2 mt-2">
                    <p>Работа: </p>
                    <div class="bl-height py-1"
                    :style="{ width: `${(store.getByTag('работа').length/store.all_tasks.length * 400)}px` }"></div>
                    <p>{{ Math.round(store.getByTag('работа').length/store.all_tasks.length * 100) }}%</p>
                    
                </div>
                <div class="flex gap-2 mt-2 mb-10 items-center">
                <p>Другое: </p>
                <div class="bl-height py-1" 
                    :style="{ width: `${((store.all_tasks.length - store.getByTag('учеба').length - store.getByTag('работа').length)/store.all_tasks.length * 200)}px` }"></div>
                <p>{{ Math.round((store.all_tasks.length - store.getByTag('учеба').length - store.getByTag('работа').length)/store.all_tasks.length * 100) }}%</p>
            </div>
            </div>
        </div>
    </div>
    <h2 class="title text-2xl inline">Продуктивность</h2>
</template>
<style scoped>
    .bl-height {
        height: 20px; 
        background-color: #1F3C5A;
        min-width: 4px; 
        border-radius: 4px; 
    }
    .title {
        border-bottom: 1px solid black;
    }
</style>