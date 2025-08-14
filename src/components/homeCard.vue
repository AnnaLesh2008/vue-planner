<script setup>
    import { computed } from "vue";
    import taskCard from "./taskCard.vue";
    import { useTasksStore } from "@/stores/tasks";
    const store = useTasksStore()
    
    const props = defineProps({
        isGreen: Boolean,
        isYellow: Boolean,
        isRed: Boolean,
        Category: String,
        filterSelect: String
    })

    const filteredTasks = computed(() => {
        return store.getByTwo(props.filterSelect, props.Category).slice(0, 3)
    })
</script>

<template>
    <div class="card" :class="{
        'card-green': isGreen,
        'card-yellow': isYellow,
        'card-red': isRed
    }">
        <h3 class="card-title text-center p-4 text-xl uppercase">
            <span v-if="isRed">Срочно!</span>
            <span v-if="isYellow">Важно</span>
            <span v-if="isGreen">Подождёт</span>
        </h3>
        <div class="flex flex-col p-5 gap-5">
            <taskCard 
                v-for="task in filteredTasks" 
                :key="task.id"
                :title="task.title" 
                :tag="task.tag" 
                :deadline="task.deadline"
                :id="task.id"
            />
        </div>
    </div>
</template>
<style>
    .card{
        width: 33.35%;
        
    }
    .card-red{
        background-color: #FFD8D8;
    }
    .card-red .card-title{
        color: #BC0000;
        background-color: #FEB8B8;
    }

    .card-yellow{
        background-color: #FFF5D8;
    }
    .card-yellow .card-title{
        color: #A98201;
        background-color: #FFECB2;
    }

    .card-green{
        background-color: #E5FFD8;
    }
    .card-green .card-title{
        color: #1AA901;
        background-color: #BBFFB2;
    }

</style>