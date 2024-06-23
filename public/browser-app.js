const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskInputDescriptionDOM = document.querySelector('.task-input-description')
const taskInputDueDateDOM = document.querySelector('.task-input-due-date')

const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name, description, dueDate } = task
        const dueDateObj = new Date(dueDate);
        const month = dueDateObj.toLocaleString('default', { month: 'long' });
        const year = dueDateObj.getFullYear();
        const date = dueDateObj.getDate();
        return `<div class="single-task ${completed && 'task-completed'}">
          <div class="task-detail">
            <div class="task-header">
              <h5 class="task-title">
                <span><i class="far fa-check-circle"></i></span>${name}
              </h5>
              <div class="task-links">
                <!-- edit link -->
                <a href="task.html?id=${taskID}" class="edit-link">
                  <i class="fas fa-edit"></i>
                </a>
                <!-- delete btn -->
                <button type="button" class="delete-btn" data-id="${taskID}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <h5>${date}-${month}-${year}</h5>
            <p>
            ${description}
            </p>
          </div>
        </div>
        `
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const description = taskInputDescriptionDOM.value
  const dueDate = taskInputDueDateDOM.value

  try {
    await axios.post('/api/v1/tasks', { name, description, dueDate })
    showTasks()
    taskInputDOM.value = ''
    taskInputDescriptionDOM.value = ''
    taskInputDueDateDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 2000)
})
