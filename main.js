const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#todoList');

let todos = [];

function loadTodos() {
    const saved = localStorage.getItem('todos');

    if (saved) {
        try {
            todos = JSON.parse(saved); 
        } catch (error) {
            todos = [];
        }   
    }
}

loadTodos();
render();

addBtn.addEventListener('click', function () {
    addTodo();
});

function addTodo() {
    const value = input.value;

    if (value.trim() === '') {
        return;
    } 

    todos.push({
        text: value,
        done: false
    });
    saveTodos();
    render();

    input.value = '';
};

function render() {
    list.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const li = document.createElement('li');
        li.textContent = todos[i].text;
        li.classList.add('done');
            
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        li.appendChild(btn);
        
        btn.addEventListener('click', function() {
            todos.splice(i, 1);
            saveTodos()
            render();
        });

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        li.appendChild(btnEdit);

        btnEdit.addEventListener('click', function () {
            const newValue = prompt('Edit todo', todos[i].text);

            if (newValue === null || newValue.trim() === '') {
                return;
            } else {
                todos[i].text= newValue;
                saveTodos();
                render();
            }
        });

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        li.appendChild(checkBox);
        checkBox.checked = todos[i].done;

        checkBox.addEventListener('change', function(event) {
            todos[i].done = checkBox.checked;
            saveTodos();
            render();
        });

        list.appendChild(li);
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});


console.log(todos);
