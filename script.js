const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

//try to load saved todos from localStorage(if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

}

//create a dom node for a todo object and append it to the list
function creatTodoeNode(todo, index) {
    const li = document.createElement("li");

    //checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;

        //TODO:visual feedback:Strike-through when completed
        textSpan.style.textDecoration = todo.completed ? "line-through" : " ";
        saveTodos();
    });

    //Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px"
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }
    //add double click event listner
    textSpan.addEventListener("dblclick", function () {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodo();
        }
    });

    //delete Todo Button
    const delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    delbtn.addEventListener("click", function () {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
}



//render the whole todo list from todos array
function render() {
    list.innerHTML = " ";

    //recreate each item
    todos.forEach((todo, index) => {
        const node = creatTodoeNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    //push new todo object
    todos.push({ text, completed: false });
    input.value = "";
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        addTodo();
    }
});
render();
