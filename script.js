const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
        event.preventDefault(); // Prevents the default action of the Enter key in a form
    }
});
    

function addTask() {
    const task = inputBox.value.trim();
    if (task === '') {
        alert('Please enter a task');
    } else {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = '❌'; // Using an emoji for simplicity, consider an icon
        span.classList.add('delete'); // A class for styling and identification
        span.setAttribute('aria-label', 'Delete task'); // Accessibility for screen readers

        li.textContent = task;
        li.appendChild(span);
        li.classList.add('task', 'unchecked');
        listContainer.appendChild(li);
        saveTasks();
    }
    inputBox.value = '';
}


listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        e.target.classList.toggle('unchecked');
        saveTasks();
    } else if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove(); // Remove the parent <li> element
        saveTasks();
    }
});


function saveTasks() {
    // Using a more structured approach to storage
    const tasks = [];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({ text: li.textContent, checked: li.classList.contains('checked') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.add('task', task.checked ? 'checked' : 'unchecked');
        listContainer.appendChild(li);
    });
}

getTasks();
