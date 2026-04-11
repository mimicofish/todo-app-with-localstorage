const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#todoList');
const counter = document.querySelector('#counter');

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

        alert('Please add To do');
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

    let completed = 0;
    for (let i = 0; i < todos.length; i++) {
        const li = document.createElement('li');
        li.textContent = todos[i].text;

        if (todos[i].done) {
            li.classList.add('done');
            completed++;
        }
            
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.classList.add('delete-button');
        li.appendChild(btn);

        btn.dataset.action = 'delete';
        li.dataset.index = i;
        
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.classList.add('edit-button');
        li.appendChild(btnEdit);

        btnEdit.dataset.action = 'edit';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        li.appendChild(checkBox);
        checkBox.checked = todos[i].done;

        checkBox.dataset.action = 'toggle';

        list.appendChild(li);

    }

    counter.textContent = `${completed} / ${todos.length} completed`;

}

list.addEventListener('click', function(event) {
    const action = event.target.dataset.action;

    if (!action) return;

    const li = event.target.closest('li');
    const index = li.dataset.index;

    if (action === 'delete') {
        li.classList.add('fade-out');

        setTimeout(() => {
            todos.splice(index, 1);
            saveTodos()
            render();
        }, 300); 
    } else if (action === 'edit') {
        li.innerHTML = '';
        const editInput = document.createElement('input');
        editInput.value = todos[index].text;
        li.appendChild(editInput);

        editInput.focus();
        editInput.select();

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        li.appendChild(saveBtn);

        function saveTodo(){
            const newValue = editInput.value;

            if (newValue === null || newValue.trim() === '') {
            return;
            } else {
                todos[index].text = newValue;
                saveTodos();
                render();
            }
        };

        saveBtn.addEventListener('click', saveTodo);

        editInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                saveTodo();
            } else if (event.key === 'Escape') {
                render();
            }
        });
    } else if (action === 'toggle') {
        todos[index].done = !todos[index].done;
        saveTodos();
        render();
    }
});

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
