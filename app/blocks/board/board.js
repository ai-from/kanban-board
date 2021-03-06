const table = document.getElementById('boardTable')
const metas = ['Backlog', 'Working', 'Done', 'Completed']
const addColumnBtn = document.getElementById('addColumn')

const boardData = [
  {
    top: {pic: 'backlog', title: 'Беклог', meta: 'Backlog'},
    tasks: [
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Интерфейс динамики кадров на предприятии'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Ежемесячный отчёт для куратора'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Статистика по заявкам'}
    ]
  },
  {
    top: {pic: 'working', title: 'В работе', meta: 'Working'},
    tasks: [
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Заявки сгруппировать по заявкам'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Ограничения по безопасности'}
    ]
  },
  {
    top: {pic: 'done', title: 'Выполнена', meta: 'Done'},
    tasks: [
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Проживание: новое поле для тех кто работает'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Рейтинг мастеров в интерфейсе менеджера'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Перенос данных в конце месяца'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Доработки по интерфейсу «Плана»'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Подвешенная заявка'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Интерфейс динамики кадров на предприятии'}
    ]
  },
  {
    top: {pic: 'completed', title: 'Сдана', meta: 'Completed'},
    tasks: [
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Временной промежуток при фильтрации'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Статистика по источникам звонка'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Добавить график к статистике пользователей (количество регистраций)'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Создать тестовую сборку сервиса (для обработки нововведений)'}
    ]
  }
]

const changeData = [...boardData] || []

getTasks = tasks => {
  let res = ''
  tasks.forEach((task, i) => {
    return res += `
       <div
          id='${+ new Date() + i}'
          class="task" 
          draggable="true"
          ondragstart="return dragStart(event)"
          data-task="${i}"
       >
         <div class="left_part">
           <div class="persons">
             <img draggable="false" src="./assets/img/board/${task.pics[0]}.png" alt="" title="">
             <img draggable="false" src="./assets/img/board/${task.pics[1]}.png" alt="" title="">
           </div>
           <img draggable="false" class="arrows" src="./assets/img/board/arrows.svg" alt="" title="">
         </div>
         <div class="right_part">
           <div class="title">
             <span>#${task.number}:</span>${task.title}
           </div>
         </div>
       </div>
    `
  })
  return res
}

getBoard = () => {
  changeData.forEach((column, i) => {
    table.insertAdjacentHTML('beforeend', `
      <div class="item" data-column="${i}">
        <div class="top_part">
          <div class="left_part">
            <img src="./assets/img/board/${column.top.pic}.png" alt="${column.top.meta}" title="${column.top.meta}">
            <div class="title">${column.top.title}</div>
          </div>
          <div class="right_part">
            <img src="./assets/img/board/edit.svg" alt="Edit" title="Edit">
            <img onclick="deleteColumn('${i}')" src="./assets/img/board/delete.svg" alt="Delete" title="Delete">
          </div>
        </div>
        <div class="tasks ${isEmptyTasks(i)}"
             ondragenter="return dragEnter(event)"
             ondrop="return dragDrop(event)"
             ondragover="return dragOver(event)"
             ondragleave="return dragLeave(event)"
        >
          ${getTasks(column.tasks)}
        </div>
        <div class="add_task">
          <img src="./assets/img/board/plus.svg" alt="Add" title="Add">
        </div>
      </div>
    `)
  })
  setClass()
  isDisabled()
}

addColumn = () => {
  const columns = []
  if(changeData.length >= 4) return false
  else {
    changeData.forEach(item => columns.push(item.top.meta))
    let i = 0
    while(i < metas.length){
      if(!columns.includes(metas[i])){
        const addingItem = boardData.slice(i, i+1)
        changeData.splice(i, 0, addingItem[0])
        table.innerHTML = ''
        getBoard()
        break
      }
      i++
    }
  }
}

deleteColumn = (i) => {
  changeData.splice(i, 1)
  table.innerHTML = ''
  getBoard()
}

setClass = () => {
  let currClass = ''
  switch (changeData.length) {
    case 3: currClass = 'three'; break
    case 2: currClass = 'two'; break
    case 1: currClass = 'one'
  }
  table.className = currClass
}

isDisabled = () => {
  changeData.length >= 4 ?
    addColumnBtn.setAttribute('disabled', 'disabled') :
    addColumnBtn.removeAttribute('disabled')
}

isEmptyTasks = i => changeData[i].tasks.length === 0 ? 'empty' : ''

getBoard()

// drag and drop
dragEnter = e => {
  e.preventDefault()
  return true
}
dragDrop = e => {
  const data = JSON.parse(e.dataTransfer.getData('Task'))
  const tasks = e.target.closest('.tasks')
  tasks.classList.remove('drag-hover')
  data.to = e.target.closest('.item').dataset.column
  updateAfterDrop(data)
  e.stopPropagation()
  return false
}
dragOver = e => {
  e.preventDefault()
  const tasks = e.target.closest('.tasks')
  tasks.classList.add('drag-hover')
}
dragLeave = e => {
  const tasks = e.target.closest('.tasks')
  tasks.classList.remove('drag-hover')
}
dragStart = e => {
  e.dataTransfer.effectAllowed = 'move'
  const data = {
    id: e.target.getAttribute('id'),
    from: {
      column: e.target.closest('.item').dataset.column,
      task: e.target.closest('.task').dataset.task
    }
  }
  e.dataTransfer.setData('Task', JSON.stringify(data))
  e.dataTransfer.setDragImage(e.target, e.target.offsetWidth/2, e.target.offsetHeight/2)
  return true
}
updateAfterDrop = obj => {
  const insertTask = changeData[+obj.from.column].tasks[+obj.from.task]
  changeData[+obj.from.column].tasks.splice(+obj.from.task, 1)
  changeData[+obj.to].tasks.unshift(insertTask)
  table.innerHTML = ''
  getBoard()
}