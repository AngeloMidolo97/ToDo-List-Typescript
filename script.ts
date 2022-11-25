var btnTask = document.getElementById('btn') as HTMLButtonElement
var inpTask = document.getElementById('task') as HTMLInputElement
var list = document.getElementById('print') as HTMLElement
var btnDel = document.getElementById('btnDel') as HTMLElement

interface TaskInt {
    id: number,
    task: string,
    complete: boolean
}

interface NewTask {
    task: string,
    complete: boolean
}

interface TaskId {
    id: number
}

interface TaskComplete {
    complete: boolean
}

class Task {
    id: number;
    task: string;
    complete: boolean;
    constructor(_id: number, _task: string, _complete: boolean) {
        this.id = _id,
            this.task = _task,
            this.complete = _complete
    }
    completa() {
        if(this.complete === true){
            this.complete = false;
        }else{
            this.complete = true;
        }
        fetch('https://todo-list-eight-xi.vercel.app/data.json/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(this)
        });
    }
    delTask() {
        if (!window.confirm('Sicuro di voler eliminare questa task?')) {
            return;
        }
        fetch('https://todo-list-eight-xi.vercel.app/data.json/' + this.id, {
            method: 'DELETE'
        });
    }
    creaRiga() {
        var newDiv = document.createElement('div');
        var h2 = document.createElement('h2');
        var newDiv2 = document.createElement('div');
        var btn1 = document.createElement('button');
        var btn2 = document.createElement('button');

        list.appendChild(newDiv);
        newDiv.appendChild(h2);
        newDiv.appendChild(newDiv2);
        newDiv2.appendChild(btn1);
        newDiv2.appendChild(btn2);

        newDiv.classList.add('container', 'mt-2', 'border', 'rounded', 'd-flex', 'justify-content-between', 'p-3');
        btn1.classList.add('btn', 'btn-success', 'mx-1');
        btn2.classList.add('btn', 'btn-primary');
        

        h2.innerText = this.task;
        btn1.innerHTML = '<i class="bi bi-check2-square">';
        btn2.innerHTML = '<i class="bi bi-trash"></i>';
        if(this.complete === true){
            h2.classList.add('complete')
        }else{
            h2.classList.remove('complete')
        }

        btn1.addEventListener('click', () => {
            this.completa();
            window.location.reload();
        })

        btn2.addEventListener('click', () => {
            this.delTask();
            window.location.reload();
        })
    }
}

getData();

let array: TaskInt[];

function getData() {
    fetch('https://todo-list-eight-xi.vercel.app/data.json').then((response) => {
        return response.json();
    }).then((data: TaskInt[]) => {
        array = [];
        array = data;
        console.log(array);
        array.map(function (element) {
            let c = new Task(element.id, element.task, element.complete);
            console.table(c);
            c.creaRiga();
        })
    })
}

btnTask.addEventListener('click', () => {
    var newTask = {
        task: inpTask.value,
        complete: false
    }
    addData(newTask);
    window.location.reload();
})

async function addData(data: NewTask) {
    if(inpTask.value === ''){
        alert('Attenzione compilare il campo');
        return;
    }
    let response = await fetch('https://todo-list-eight-xi.vercel.app/data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
}

