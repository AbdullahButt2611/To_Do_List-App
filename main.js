const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");




//If todos doesnt exist pass an empty array to todos
//Else fetching the data from local storage
let todos = JSON.parse(localStorage.getItem("todo-list") || "[]")





function showTodo(){

    // if todos status is completed set the isCompleted Status to checked.
    let isCompleted = todos.status == "completed" ? "checked" : ""; 

    let li = "";
    
    if(todos)
    {
        todos.forEach((todo, id) => {
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick = "updateStatus(this)" type="checkbox" id="${id}">
                            <p>${todo.name}</p>
                        </label>
    
                        <div class="settings">
                            <i class='bx bx-dots-horizontal-rounded'></i>
                            <ul class="task-menu">
                                <li><i class='bx bx-pencil'></i>Edit</li>
                                <li><i class='bx bx-trash' ></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        });
    }

    taskBox.innerHTML= li;
}

showTodo();








// Updating the status of element on checking and unchecking the checkbox
function updateStatus(selectedTask){

    // Getting paragraph that contains task name.
    let taskName = selectedTask.parentElement.lastElementChild;
    console.log(taskName)
    
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


        

        taskInput.value = "";

        let taskInfo = {name: userTask, status: "pending"};

        todos.push(taskInfo);   //Adding new task to todos
        localStorage.setItem("todo-list",JSON.stringify(todos));

        showTodo();
    }
});