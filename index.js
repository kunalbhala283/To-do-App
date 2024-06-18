
let todoInput = document.querySelector(".input");
let addtodoButton = document.querySelector(".button");
let showtodos = document.querySelector(".todos-container");
let todo;
let LocalData = JSON.parse(localStorage.getItem("todo"));
let todolist = LocalData || [];


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

addtodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("clicked");
    todo = todoInput.value;
    if (todo.length > 0) {
        todolist.push({ id: uuid(), todo, isCompleted: false })
    }
    //console.log(todolist)
    renderTdoList(todolist);
    localStorage.setItem("todo", JSON.stringify(todolist));
    todoInput.value = "";
})

// renderTdoList(todolist);
showtodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey;
    todolist = todolist.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    todolist = todolist.filter(todo => todo.id !== delTodokey)
    localStorage.setItem("todo", JSON.stringify(todolist));
    renderTdoList(todolist);
    console.log(todolist)

})


function renderTdoList(todoList) {
    localStorage.setItem("todo", JSON.stringify(todolist));
    showtodos.innerHTML = todoList.map(({ id, todo, isCompleted }) => `<div class="todo relative"><input class="t-checkbox t-pointer" id="item-${id} " type="checkbox" data-key="${id}" ${isCompleted ? "checked" : ""}>
    <label class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for ="item-${id}" data-key=${id}>${todo}</label><button class="absolute right-0 button cursor"> <span class="del-btn material-symbols-outlined"  data-todokey=${id}>
    delete </span></button></div>`)
}


renderTdoList(todolist);