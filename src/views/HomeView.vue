<script setup>
    import homeCard from "@/components/homeCard.vue";
    import { useTasksStore } from "@/stores/tasks";
    import { ref, watch } from "vue";
    import newTask from "@/components/newTask.vue"
    import editTask from "@/components/editTask.vue"
    import notificationModal from "@/components/notificationModal.vue"
    import ByCategory from "@/components/ByCategory.vue";
    import firstPartStatistics from "@/components/firstPartStatistics.vue";
    import secondPartStatistics from "@/components/secondPartStatistics.vue";
    import BadChart from "@/components/BadChart.vue"
    const store = useTasksStore()
    const filterValue = ref('')
    const filterCategory = ref('')
    function selectTag(event){
      filterValue.value = event.target.value
    }
    function selectCategory(event){
      filterCategory.value = event.target.value
    }
    const cart = ref(false)
    const closeCart = (msg) => {
      cart.value = false
    }
    const changeValue = () => {
      cart.value = true
    }

    const closeEdit = (msg) => {
      store.edit = false
    }
    const findColor= () => {
      if(filterCategory.value.length){
        if (filterCategory.value == 'quick'){
          return 'isRed'
        }
        else if (filterCategory.value == 'important'){
          return 'isYellow'
        }
        else{
          return 'isGreen'
        }
      }
    }
</script>

<template>
    <!--Фильтры-->
    <div class="flex justify-between mb-8">
    <div style="background-color: #E5662F" class="flex px-8 py-2 items-center gap-2 cursor-pointer"><p style="color: white;" class="text-xl" @click="changeValue">новая задача</p> 
</div>

  <div class="filters flex gap-5">
    <select class="text-xl px-5 py-2" @change="selectCategory($event)" style="border: 1px solid black;">
      <option value="">Все</option>
      <option value="quick">Срочно</option>
      <option value="important">Важно</option>
      <option value="just">Подождёт</option>
    </select>

    <select class="text-xl px-5 py-2" @change="selectTag($event)" style="border: 1px solid black;">
      <option value="">Все</option>
      <option v-for="tag in store.allTags()" :key="tag" :value="tag">{{ tag }}</option>
    </select>
  </div>
  </div>

  <!--Карточки-->
  <div v-if="!filterCategory" class="flex justify-between">
    <homeCard :isRed="true" :Category="'quick'" :filterSelect="filterValue"/>
  <homeCard :isYellow="true" :Category="'important'" :filterSelect="filterValue"/>
  <homeCard :isGreen="true" :Category="'just'" :filterSelect="filterValue"/>
  </div>

  <div v-else>
    <ByCategory :category="filterCategory"/>
  </div>


  <newTask v-if="cart" @close-cart="closeCart"/>
  <editTask v-if="store.edit" @close-cart="closeEdit"/>

  <h1 class="text-3xl mt-8 mb-3 ">СТАТИСТИКА</h1>
  
  <firstPartStatistics/>
  <secondPartStatistics/>
  <BadChart/>
  
</template>

<style scoped>
    
</style>