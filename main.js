const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", e =>{
    let userTask = taskInput.value.trim();              //Removing white spaces from text

    if(e.key == "Enter" && userTask){                   // If the user has pressed Enter and the value is not null

        // Getting local storage todo-list
        let todos = localStorage.getItem("todo-list");

        if (!todos){
            todos = [];
        }

    }
});