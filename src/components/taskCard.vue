<script setup>
import { useTasksStore } from "@/stores/tasks";
defineProps({
    title: "",
    tag: "",
    deadline: "",
    id: Number,

})


const store= useTasksStore()
const openEdit = (id) => {
    store.edit = true
    store.cur_id = id
    console.log(store.cur_id)
}

</script>
<template>
    <div class="tasks-wrap">
            <div class="task bg-white p-3 rounded-lg flex justify-between">
                <div><p class="uppercase text-xl mb-2">{{ title }}</p>
                <p class="mb-2">тег: {{ tag }}</p>
                <p>дедлайн: {{ deadline }}</p></div>

                <div class="flex flex-col justify-between">
                    <img @click="store.doneTask(id)" class="cursor-pointer" src="../../public/done.svg" alt="">
                    <img @click="openEdit(id)" class="cursor-pointer" src="../../public/create.svg" alt="">
                    <img @click="store.deleteTask(id)" class="cursor-pointer" src="../../public/delete_sweep.svg" alt="">
                </div>
            </div>
        </div>
</template>