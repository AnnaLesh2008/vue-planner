<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { useTasksStore } from '@/stores/tasks';
  import { Chart, BarController, LinearScale, CategoryScale, BarElement, Tooltip } from 'chart.js';
  
  // Регистрируем компоненты Chart.js
  Chart.register(BarController, LinearScale, CategoryScale, BarElement, Tooltip);
  
  export default {
    name: 'TasksChart',
    setup() {
      const tasksStore = useTasksStore();
      const chartCanvas = ref(null);
      let chartInstance = null;
  
      // Получаем данные для графика
      const getChartData = () => {
        const datesData = tasksStore.getAllDates || {}; // Защита от undefined
        const labels = Object.keys(datesData).sort();
        const data = labels.map(date => datesData[date]);
  
        return {
          labels,
          datasets: [{
            label: 'Количество выполненных задач',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        };
      };
  
      // Инициализация или обновление графика
      const initChart = () => {
        if (!chartCanvas.value) return;
  
        const ctx = chartCanvas.value.getContext('2d');
        
        // Уничтожаем предыдущий график, если есть
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: getChartData(),
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Количество задач'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Даты выполнения'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `${context.parsed.y} задач`
                }
              }
            }
          }
        });
      };
  
      // Отслеживаем изменения в хранилище
      watch(
        () => tasksStore.getAllDates,
        () => {
          if (chartInstance) {
            chartInstance.data = getChartData();
            chartInstance.update();
          } else {
            initChart();
          }
        },
        { deep: true }
      );
  
      // Инициализация при монтировании
      onMounted(() => {
        initChart();
      });
  
      // Очистка при демонтировании
      onBeforeUnmount(() => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      });
  
      return { chartCanvas };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px; /* Фиксированная высота (можно адаптировать) */
    position: relative;
  }
  </style>