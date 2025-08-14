import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useTasksStore = defineStore('tasks', {
    state: () => ({
        all_tasks: [],
        all_all_tasks: [],
        tags: ['учеба', 'работа', 'личное', 'быт', 'финансы', 'здоровье', 'семья'],
        edit: false,
        cur_id: 0,
        del: false
    }),
    getters: {
        getById: (state) => (id) => state.all_tasks.find(task => task.id == id),
        getPrTasks: (state) => state.all_tasks,
        getAllDates() {
            let all_dates =  this.all_all_tasks.map(task => task.endDate).filter(date => date)
            let dates = all_dates
            let d = {}
            for (let i in dates){
                if (dates[i].split('T')[0] in d){
                    d[dates[i].split('T')[0]] += 1
                }
                else{
                    d[dates[i].split('T')[0]] = 1
                }
            }
            return d
          },
        getMaxDate(state){
            let dates = state.getAllDates
            let max_v = 0
            let max_key = ""
            for (let i in dates){
                if (dates[i] > max_v){
                    max_v = dates[i]
                    max_key = i
                }
            }
            return max_key
        },
        getWeekByDate(state){
            const date = new Date(state.getMaxDate)
            const dayOfWeek = date.toLocaleString('ru-RU', { weekday: 'long' })
            return dayOfWeek
        },
        getAllCategories(state){
            let categories = {}
            for (let i in state.all_all_tasks){
                if (state.all_all_tasks[i].tag.length){
                    if (state.all_all_tasks[i].tag in categories){
                        categories[state.all_all_tasks[i].tag] += 1
                    }
                    else{
                        categories[state.all_all_tasks[i].tag] = 1
                    }
                }
            }
            return categories
        },
        getPopularCategory(state){
            let cat = state.getAllCategories
            let max_v = 0
            let max_k = ""
            for (let i in cat){
                if (cat[i] > max_v){
                    max_v = cat[i]
                    max_k = i
                }
            }
            return max_k
        },
        getMaxTimeTask(state){
            const completedTasks = state.all_all_tasks.filter(task => 
                task.done === true && 
                task.startDate && 
                task.endDate
              )
            let max_t = 0
            let max_k = ""
            for (let i in completedTasks){
                let enddate = new Date(completedTasks[i].endDate)
                let startdate = new Date(completedTasks[i].startDate)
                let taskTime =  enddate - startdate
                if (taskTime > max_t){
                    max_t = taskTime
                    max_k = completedTasks[i].title
                }
            }
            return max_k
        }
    },
    actions:{
        async getAllTasks(){
            try{
                const response = await axios.get('https://fa0ef3ee68ea8889.mokky.dev/tasks')
                this.all_tasks = response.data.filter((task) => task.done != true)
            }
            catch(err){
                console.log(err)
            }
        },
        async getAllAllTasks(){
            try{
                const response = await axios.get('https://fa0ef3ee68ea8889.mokky.dev/tasks')
                this.all_all_tasks = response.data
            }
            catch(err){
                console.log(err)
            }
        },

        getByCategory(category) {
            return this.all_tasks.filter(task => task.category === category)
            
          },
        getByTag(tag){
            return this.all_tasks.filter(task => task.tag === tag)
        },
        getByTwo(tag, category) {
            if (!tag && !category) return this.all_tasks;
            let filtered = this.all_tasks;
            if (tag) filtered = filtered.filter(task => task.tag === tag);
            if (category) filtered = filtered.filter(task => task.category === category);
            return filtered;
        },
        
        async deleteTask(taskId){
            try{
                await axios.delete('https://fa0ef3ee68ea8889.mokky.dev/tasks/'+taskId)
                this.all_tasks = this.all_tasks.filter(task => task.id !== taskId)
                this.del = true
            }
            catch(err){
                console.log(err)
            }
          },
          allTags() {
            for (let i = 0; i < this.all_tasks.length; i++) {
                const task = this.all_tasks[i];
                if (task.tag && !this.tags.includes(task.tag)) {
                    this.tags.push(task.tag);
                }
            }
            return this.tags
        },
        async addNewTask(name, description1, category1, tag1,date){
            await axios.post('https://fa0ef3ee68ea8889.mokky.dev/tasks',
        {
            title: name,
            done: false,
            startDate: new Date(),
            deadline: date,
            tag: tag1,
            category: category1,
            endDate: "",
            description: description1

        })
        this.getAllTasks()

        },
        async editTask(name, description1, category1, tag1,date){
            await axios.patch('https://fa0ef3ee68ea8889.mokky.dev/tasks/'+ this.cur_id, {
                title: name,
                description: description1,
                deadline: date,
                tag: tag1,
                category: category1
            })
            this.getAllTasks()
        },

        async doneTask(task_id){
            await axios.patch('https://fa0ef3ee68ea8889.mokky.dev/tasks/' + task_id, {
                done: true,
                endDate: new Date()
            })
            this.getAllTasks()

        },
        async getOverdueTasks() {
            await this.getAllAllTasks()
            
            const overdueTasks = []
            
            for (const task of this.all_all_tasks) {
              if (!task.done && task.deadline) {
                const deadlineDate = new Date(task.deadline)
                if (new Date() > deadlineDate) {
                  overdueTasks.push(task)
                }
              }
            }
            
            return overdueTasks
          },
        getPercent(){
            const done_tasks = this.all_all_tasks.length - this.all_tasks.length
            const perc = (done_tasks/this.all_all_tasks.length)*100
            return perc
        },
        async getAverageCompletionTime() {
            try {
              // Получаем все задачи (включая выполненные)
              await this.getAllAllTasks();
              
              // Фильтруем только выполненные задачи, у которых есть startDate и endDate
              const completedTasks = this.all_all_tasks.filter(task => 
                task.done === true && 
                task.startDate && 
                task.endDate
              );
          
              if (completedTasks.length === 0) {
                return 0; // Если нет выполненных задач, возвращаем 0
              }
          
              let totalHours = 0;
          
              completedTasks.forEach(task => {
                const start = new Date(task.startDate);
                const end = new Date(task.endDate);
                
                // Вычисляем разницу в миллисекундах и преобразуем в часы
                const durationHours = (end - start) / (1000 * 60 * 60);
                totalHours += durationHours;
              });
          
              // Вычисляем среднее время выполнения в часах
              const averageHours = totalHours / completedTasks.length;
              
              // Округляем до 2 знаков после запятой
              return Math.round(averageHours * 100) / 100;
            } catch (err) {
              console.error('Error calculating average completion time:', err);
              return 0;
            }
          },
          TakeAchivki(){
            let achivki = {}
            // Первая ачивка (Новичок)
            if (this.all_all_tasks.length > 1){
                achivki['Новичок'] = "Создайте первую задачу"
            }
            // Вторая ачивка (начало работы)
            const completedTasks = this.all_all_tasks.filter(task => 
                task.done === true && 
                task.startDate && 
                task.endDate
              )
            if (completedTasks.length>1){
                achivki["Начало работы"] = "Выполните одну задачу"
            }
            //Уверенный пользователь
            if (this.all_all_tasks.length > 5){
                achivki["Уверенный пользователь"] = "Создайте 5 задач"
            }


            //Про
            if (completedTasks.length > 10){
                achivki["Про"] = "Выполните 10 задач"
            }

            // Работник года
            const completedTasksWork = this.all_all_tasks.filter(task => 
                task.done === true && 
                task.startDate && 
                task.endDate && task.tag == "работа"
              )
             if (completedTasksWork.length > 5){
                achivki["Работник года"] = "Выполните 5 задач с тегом работа"
             }
             return achivki

          }


        

        
    }

})