<script setup>
    import { ref } from "vue"
    import taskCard from './taskCard.vue'
    import {useTasksStore} from '../stores/tasks'
    defineProps({
        category: String,
        isRed: false,
        isYellow: false,
        isGreen: false
    })
    const store = useTasksStore()
    
</script>
<template>
    <div class="card" :class="{
        'card-green': category=='just',
        'card-yellow': category=='important',
        'card-red': category=='quick'
    }">
        <h3 class="card-title text-center p-4 text-xl uppercase">
            <span v-if="category=='quick'">Срочно!</span>
            <span v-else-if="category=='important'">Важно</span>
            <span v-else>Подождёт</span>
        </h3>
        <div class="flex flex-wrap p-5 gap-5 justify-start">
            <taskCard class="task-card" v-for="task in store.getByCategory(category)" :key="task.id" :title="task.title" :tag="task.tag" :deadline="task.deadline" :id="task.id"/>
        </div>
    </div>
</template>
<style scoped>
    .card{
        width: 100%
    }

    .task-card{
        width: 32%;
    }
</style>

