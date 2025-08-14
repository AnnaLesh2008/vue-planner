<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 2000)
})
</script>

<template>
  <transition name="fade">
    <div 
      v-if="isVisible"
      class="modal fixed top-30 left-0 right-0 w-full py-3 z-30 text-2xl text-white text-center"
    >
      <h4 class="m-0 p-0">Задача выполнена!</h4>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  background-color: #50F763;
  color: #f7f9f8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>