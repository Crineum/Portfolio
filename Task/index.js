window.onload = () => {
    /* Переменые  */
    /*task пример данных полученых от сервера*/
    let task = [{
        id: "Task1",
        Name: "Задача 1",
        Subtasks: [{
            Name: "Подзадача 1",
            Through: 0
        }, {
            Name: "Подзадача 2",
            Through: 0
        }, ]
    }, {
        id: "Task2",
        Name: "Задача 2",
        Subtasks: [{
            Name: "Подзадача 1",
            Through: 0
        }, {
            Name: "Подзадача 2",
            Through: 0
        }, {
            Name: "Подзадача 3",
            Through: 0
        }, {
            Name: "Подзадача 4",
            Through: 0
        }]
    }];
    /*Содержит id блока открытого в данный момент*/
    let check = new String;

    /*Функции*/
    /*Создает на странице строку с название Задачи*/
    Create_a_record = (x) => {
        let text = `<li> <input type="radio" name="Task" id="${x.id}"><label for="${x.id}"> ${x.Name}</label> </li>`;
        document.getElementById('container').insertAdjacentHTML('beforeend', text);
    };
    /*При создание страницы запускает функцию, для ввода на страницу всех задач*/
    (() => {
        for (let item of task) {
            Create_a_record(item);
        }
    })();
    /*Создает на странице строку с название Подзадачи*/
    Create_a_subtasks = (item) => {
        let through = "through";
        document.getElementById("container2").innerHTML = "";
        for (let i = 0; i < item.Subtasks.length; i++) {
            if (item.Subtasks[i].Through === 1) {
                through = 'through';
            } else {
                through = "";
            }
            let div = document.createElement('div');
            div.innerHTML = `<input type="checkbox" class="${through}" id="Pod${i}"><label for="Pod${i}" class="${through}">${item.Subtasks[i].Name}</label>`;
            document.getElementById("container2").append(div);
        }
    };

    /*Создает на странице строку с датой*/
    document.querySelector("header").children[0].innerHTML = `ToDo ${new Date().toJSON().slice(0, 10).split(/-/g).reverse().join(".")}`;

    /*события на странице при нажатие на элементы*/
    /*При нажатие на элемент(id:cnop), запрашивает у пользователя название задачи и создает запись в массиве, вызывает функцию для создание записи на странице*/
    document.getElementById("cnop").onclick = () => {
        let creat_name_task = prompt("Введите имя задача")
        if (creat_name_task.trim() !== "") {
            task.push({ id: `Task${task.length + 1}`, Name: creat_name_task, Subtasks: [] });
            Create_a_record(task[task.length - 1]);
        }
    };

    /*При нажатие на элемент(id:CnopAddTasks), запрашивает у пользователя название подзадачи и создает запись в массиве, вызывает функцию для создание записи на странице*/
    document.getElementById('CnopAddTasks').onclick = () => {
        let creat_name_subrasks = prompt("Введите имя подзадачи");
        if (creat_name_subrasks.trim() !== "") {
            let item = task.filter(i => i.id === check)[0];
            item.Subtasks.push({ Name: creat_name_subrasks, Through: 0 })
            let div = document.createElement('div');
            div.innerHTML = `<input type="checkbox" id="Pod${item.Subtasks.length-1}"><label for="Pod${item.Subtasks.length-1}">${item.Subtasks.slice(-1)[0].Name}</label>`;
            document.getElementById("container2").append(div);
        }
    };

    /*При нажатие на элемент в нутри container2, вычеркивает запись и записывает в массиве изменения по строке*/
    document.getElementById('container2').addEventListener('click', (item) => {
        try {
            if (item.target.id !== 'container2') {
                item.target.closest('div').className = "through";
                task.filter(i => i.id === check)[0].Subtasks.filter(ii => ii.Name === item.target.closest('label').innerHTML)[0].Through = 1;
            }
        } catch (error) {}
    });

    /*При нажатие на элемент в нутри nav, выводит на экран подзадачи*/
    document.querySelector("nav").addEventListener('click', (i) => {
        let item = i.target.closest('input')
        if (item !== null) {
            check = item.id;
            item = task.filter(it => it.id === item.id);
            Create_a_subtasks(item[0]);
            document.getElementById('CnopAddTasks').style = ' ';
        }
    });
}