let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let theme = localStorage.getItem("theme");

if(theme==="light"){
  document.body.classList.add("light");
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  const list = document.getElementById("taskList");
  if(!list) return;
  list.innerHTML="";

  let filtered = tasks.filter(t=>{
    if(filter==="active") return !t.completed;
    if(filter==="completed") return t.completed;
    return true;
  });

  filtered.forEach((task,i)=>{
    let li=document.createElement("li");
    if(task.completed) li.classList.add("completed");

    li.innerHTML=`
      <span onclick="toggle(${i})">${task.text}</span>
      <div>
        <button onclick="edit(${i})">Edit</button>
        <button onclick="del(${i})">X</button>
      </div>
    `;
    list.appendChild(li);
  });

  updateDashboard();
}

function addTask(){
  let input=document.getElementById("taskInput");
  if(!input.value.trim()) return;
  tasks.push({text:input.value,completed:false});
  input.value="";
  save();
  render();
}

function del(i){tasks.splice(i,1); save(); render();}
function toggle(i){tasks[i].completed=!tasks[i].completed; save(); render();}
function edit(i){
  let t=prompt("Edit task",tasks[i].text);
  if(t){tasks[i].text=t; save(); render();}
}
function filterTasks(f){filter=f; render();}

function updateDashboard(){
  let total=tasks.length;
  let done=tasks.filter(t=>t.completed).length;
  let active=total-done;

  let t=document.getElementById("totalTasks");
  let a=document.getElementById("activeTasks");
  let d=document.getElementById("doneTasks");

  if(t){t.innerText="Total: "+total;}
  if(a){a.innerText="Active: "+active;}
  if(d){d.innerText="Completed: "+done;}
}

function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light")?"light":"dark");
}

render();
