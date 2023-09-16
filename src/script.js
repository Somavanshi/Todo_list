

let tasks = [];
// it add the new task in the list
function addItem(taskName) {
    const task = {
        id: Date.now().toString(),
        taskName,
        completed: false,
    }

    tasks.push(task);
    refreshPreviousTasks();
    renderList()
    return;
}
// to show selected filter we have added this functionality
const filters = document.querySelectorAll('.filters span');

filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
        filters.forEach(function (f) {
            f.classList.remove('active');
        });
        this.classList.add('active');
    });
});
function refreshPreviousTasks() {
    const ul = document.getElementById('task-list');
    ul.innerHTML = "";  // remove the list items to refresh the list
}
function renderList(filter = "all") {
    const taskList = document.getElementById("task-list");

    for (const task of tasks) {
        if (filter === "pending" && task.completed)
            continue;

        if (filter === "completed" && !task.completed)
            continue;
        const listItem = document.createElement("li");
        // dynamically adding element to ul list
        listItem.innerHTML = `   
            <input type="checkbox" id="check-input${task.id}" class="check-input" ${task.completed ? "checked" : ""}>
            <span id="list-text" class=${task.completed ? "add-line" : ""}>${task.taskName}</span>
            <button class="checked-button"><i class="fa-regular fa-circle-xmark checked-button" id="checked-button${task.id}"></i></button>
        `;
        taskList.appendChild(listItem);
    }
    document.getElementById("total-items").innerText = tasks.length;
    return;
}

// it handle toggle of completed and pending tasks
function toggleInput(id) {
    tasks = tasks.map((task) => {
        if (id.includes(task.id)) {
            task.completed = !task.completed;
        }

        return task;
    });
    refreshPreviousTasks();
    renderList()
    return;
}

function deleteTask(id) {
    tasks = tasks.filter((task) => {
        if (id.includes(task.id)) {
            return false;
        }

        return true;
    });
    refreshPreviousTasks();
    renderList()
    return;
}

function filterOutPut(id) {

    refreshPreviousTasks();

    switch (id) {
        case "pending":
            renderList("pending");
            break;
        case "completed":
            renderList("completed");
            break;
        case "all":
            renderList("all");
            break;
        default:
            return;
    }

    return;
}

// we have added common event listener to avoid multiple listeners
document.addEventListener("click", function (event) {
    const target = event.target;

    if (target.id === "add-button") {
        const taskInput = document.getElementById("task-input");
        if (taskInput.value === "")
        return;
        addItem(taskInput.value);
        taskInput.value = "";
    } else if (target.id.includes("check-input")) {
        toggleInput(target.id);
    } else if (target.classList.contains("checked-button")) {
        deleteTask(target.id);
    } else if (target.id === "completed" || target.id === "pending" || target.id === "all") {
        filterOutPut(target.id);
    }
});

// to handle enter key press events
document.addEventListener("keyup", function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        const taskInput = document.getElementById("task-input");
        if (taskInput.value === "")
        return;
        addItem(taskInput.value);
        taskInput.value = "";
    }
    return;
});