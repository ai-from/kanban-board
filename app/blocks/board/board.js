const table = document.getElementById('boardTable')

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
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Статистика по икочникам звонка'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Добавить график к статистике пользователей (количество регистраций)'},
      {pics: ['person-1', 'person-2'], number: 20413, title: 'Создать тестовую сборку сервиса (для обработки нововведений)'}
    ]
  }
]

const changeData = [...boardData] || []

function getTasks(tasks){
  let res = ''
  tasks.forEach(task => {
    return res += `
       <div class="task">
         <div class="left_part">
           <div class="persons">
             <img src="./assets/img/task/${task.pics[0]}.png" alt="" title="">
             <img src="./assets/img/task/${task.pics[1]}.png" alt="" title="">
           </div>
           <img class="arrows" src="./assets/img/task/arrows.svg" alt="" title="">
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

function getBoard(){
  changeData.forEach((column, i) => {
    table.insertAdjacentHTML('beforeend', `
      <div class="item">
        <div class="top_part">
          <div class="left_part">
            <img src="./assets/img/cnt/${column.top.pic}.png" alt="${column.top.meta}" title="${column.top.meta}">
            <div class="title">${column.top.title}</div>
          </div>
          <div class="right_part">
            <img src="./assets/img/cnt/edit.svg" alt="Edit" title="Edit">
            <img onclick="deleteColumn('${i}')" src="./assets/img/cnt/delete.svg" alt="Delete" title="Delete">
          </div>
        </div>
        <div class="tasks">
          ${getTasks(column.tasks)}
        </div>
        <div class="add_task">
          <img src="./assets/img/cnt/plus.svg" alt="Add" title="Add">
        </div>
      </div>
    `)
  })
  setClass()
}

function addColumn(){
  const metas = ['Backlog', 'Working', 'Done', 'Completed']
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

function deleteColumn(i){
  changeData.splice(i, 1)
  table.innerHTML = ''
  getBoard()
}

function setClass(){
  let currClass = ''
  if(changeData.length === 3) currClass = 'three'
  if(changeData.length === 2) currClass = 'two'
  if(changeData.length === 1) currClass = 'one'
  table.className = currClass
}

getBoard()