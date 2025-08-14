<script setup>
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";
    const store = useTasksStore()
    const title = ref()
</script>
<template>
    <div class="flex gap-10 items-center ">
        <div class="avatar"></div>
        <div>
            <h3 class="text-3xl mb-5 uppercase">Котик Рыбкин</h3>
            <p class="text-xl">На сайте с: 28.07.2025</p>
        </div>
    </div>
    <h1 class="text-3xl mt-8 mb-3 ">ДОСТИЖЕНИЯ</h1>
    <div class="flex wrap gap-3 mb-5">
        <div v-for="[name, description] in Object.entries(store.TakeAchivki())" :key="name" class="achivka py-5 px-7 rounded-lg text-center">
      <img class="m-auto" src="../../public/achivka-img.png" alt="">
      <p class="uppercase text-xl">{{ name }}</p>
      <p class="text-lg">{{ description }}</p> <!-- Теперь описание будет отображаться -->
    </div>
    </div>
</template>
<style>
    .avatar{
        width: 250px;
        height: 250px;
        border-radius: 200px;
        background-color: rgb(211, 211, 211);
    }

    .achivka{
        border: 1px #E5662F solid;
        width: 250px;
    }
</style>