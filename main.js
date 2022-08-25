const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const clearAll = document.querySelector(".clear-btn");
const filters = document.querySelectorAll(".filters span");




//If todos doesnt exist pass an empty array to todos
//Else fetching the data from local storage
let todos = JSON.parse(localStorage.getItem("todo-list") || "[]")

let editId;
let isEditedTask = false;


// Changing the color of heading on click action
filters.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id)

    });

});


function showTodo(filter){

    
    let li = "";
    
    if(todos)
    {
        todos.forEach((todo, id) => {

            // if todos status is completed set the isCompleted Status to checked.
            let isCompleted = todo.status == "completed" ? "checked" : ""; 
            if(filter == todo.status || filter == "all"){

                li += `<li class="task">
                            <label for="${id}">
                                <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                                <p class = "${isCompleted}">${todo.name}</p>
                            </label>
        
                            <div class="settings">
                                <i onclick = "showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                                <ul class="task-menu">
                                <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick = "deleteTask(${id})" ><i class='bx bx-trash' ></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }

        });
    }

    // If it isnt empty then it will show the elements else, a message will be prompted
    taskBox.innerHTML= li || `<span>You dont have any task here</span>`;
}

showTodo("all");




function showMenu(selectedTask)
{

    // Getting Task Menu Div
    let TaskMenu = selectedTask.parentElement.lastElementChild;
    TaskMenu.classList.add("show");

    document.addEventListener("click", e => {

        // Removing show class from task menu on document click
        if(e.target.tagName != "I" || e.target != selectedTask){
            TaskMenu.classList.remove("show");
        }

    });

}








function deleteTask(deleteId){

    // Removing selected tasks from array/todos
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");

}









clearAll.addEventListener("click", () => {
    // Removing all items from array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
})










function editTask(taskId, taskName){

    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;

}















// Updating the status of element on checking and unchecking the checkbox
function updateStatus(selectedTask){

    // Getting paragraph that contains task name.
    let taskName = selectedTask.parentElement.lastElementChild;
    
    if(selectedTask.checked)
    {
        taskName.classList.add("checked");

        // Updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    }
    else
    {
        taskName.classList.remove("checked");

        // Updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }

    localStorage.setItem("todo-list",JSON.stringify(todos));

   
}










taskInput.addEventListener("keyup", e =>{
    let userTask = taskInput.value.trim();              //Removing white spaces from text

    if(e.key == "Enter" && userTask){                   // If the user has pressed Enter and the value is not null

        if(!isEditedTask)                               //If isEdited is not true
        {
            let taskInfo = {name: userTask, status: "pending"};
    
            todos.push(taskInfo);   //Adding new task to todos
        }
        else
        {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        

        taskInput.value = "";

        localStorage.setItem("todo-list",JSON.stringify(todos));

        showTodo("all");
    }
});