import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then(responce => {
    const todo = responce.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`${id} - ${title} - ${completed}`);
};


for (var i = 0; i< 10; i++) {
    setTimeout(function() {
        console.log(this)
    }).bind(this);
}
