const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
];

// (function (arrOfTasks) {})(tasks);

document.addEventListener('DOMContentLoaded', () => {
    const objOfTasks = tasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    const themes = {
        // default: {
        //     '--nav-text-color': '#ffffff',
        //     '--nav-bg-color': '#008080',
        //     '--select-color': '#16918a',
        // },
        light: {
            '--nav-text-color': '#000000',
            '--nav-bg-color': '#fcfcfc',
            '--select-color': '#000000',
            '--body-color': '#ffffff',
            '--border-color': '#000000',
            '--body-text-color': '#000000',
        },
        dark: {
            '--nav-text-color': '#ffffff',
            '--nav-bg-color': '#161616',
            '--select-color': '#ffffff',
            '--body-color': '#292828',
            '--border-color': '#ffffff',
            '--body-text-color': '#ffffff',
        },
    };

    let lastSelectedThema = localStorage.getItem('app-thema') || 'dark';
    // UI ELEMENTS
    const LIST_CONTAINER = document.querySelector('.task-list');
    const FORM = document.querySelector('.form-task');
    const INPUT_TITLE = FORM.elements['title'];
    const INPUT_BODY = FORM.elements['body'];
    const THEMA_SELECT = document.getElementById('themaSelect');

    // EVENTS
    setThema(lastSelectedThema);
    renderAllTasks(objOfTasks);
    FORM.addEventListener('submit', onFormSubmitHandler);
    LIST_CONTAINER.addEventListener('click', onDeleteHandler);
    THEMA_SELECT.addEventListener('change', onThemaSelectHandler);

    // CODE
    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error('No list');
            return;
        }

        const FRAGMENT = document.createDocumentFragment();
        Object.values(tasksList).forEach((task) => {
            const li = listItemTemplate(task);
            FRAGMENT.appendChild(li);
        });
        LIST_CONTAINER.appendChild(FRAGMENT);
    }

    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.setAttribute('data-task-id', _id);

        const h5 = document.createElement('h5');
        h5.textContent = title;
        h5.classList.add('task-body');

        const p = document.createElement('p');
        p.textContent = body;
        p.classList.add('task-title');

        const btn = document.createElement('button');
        btn.textContent = 'Delete task';
        btn.classList.add('btn', 'btn-delete-task');

        li.appendChild(h5);
        li.appendChild(p);
        li.appendChild(btn);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = INPUT_TITLE.value;
        const bodyValue = INPUT_BODY.value;

        if (!titleValue || !bodyValue) {
            alert('No values');
            return;
        }
        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        LIST_CONTAINER.insertAdjacentElement('afterbegin', listItem);
        FORM.reset();
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`,
        };
        objOfTasks[newTask._id] = newTask;
        return { ...newTask };
    }

    // function deleteTask(id) {
    //     const { title } = objOfTasks[id];
    //     const isConfirm = confirm(`Are you shure delete "${title}"?`);
    //     if (!isConfirm) return isConfirm;
    //     delete objOfTasks[id];
    //     return isConfirm;
    // }

    function deleteTaskFromHTML(element) {
        // if (!confirmed) return;
        element.remove();
    }

    function onDeleteHandler({ target }) {
        if (target.classList.contains('btn-delete-task')) {
            const parent = target.closest('[data-task-id]');
            // const id = parent.dataset.taskId;
            // const confirmed = deleteTask(id);
            deleteTaskFromHTML(parent);
        }
    }

    function onThemaSelectHandler(e) {
        const selectedThema = THEMA_SELECT.value;
        // const isConfirm = confirm(`Are you shure set "${selectedThema}"?`);
        // if (!isConfirm) {
        //     THEMA_SELECT.value = lastSelectedThema;
        //     return;
        // }
        setThema(selectedThema);
        lastSelectedThema = selectedThema;
        localStorage.setItem('app-thema', selectedThema);
    }
    function setThema(name) {
        const selectedThemaObj = themes[name];
        Object.entries(selectedThemaObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }
});
