<script setup>
    import { ref, onMounted } from 'vue';
    import { useTasksStore } from '../stores/tasks'
    const store = useTasksStore()
</script>

<template>
    <p class="text-xl">Самый продуктивный день недели: {{ store.getWeekByDate }}</p>
    <p class="text-xl">Самый популярный тег: {{ store.getPopularCategory }}</p>
    <p class="text-xl mb-10">Самая долгая задача: {{ store.getMaxTimeTask }}</p>
    <h2 class="title text-2xl inline">На графике</h2>
</template>