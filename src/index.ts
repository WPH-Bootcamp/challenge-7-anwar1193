// TODO: Import readline untuk membaca input dari command line
import * as readline from 'readline';

// TODO: Import fungsi-fungsi dari todoService
import { 
    addTodo,
    completeTodo,
    deleteTodo,
    listTodos,
    searchTodos
} from './todoService';

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)
import { isValidString } from './utils';

import { initStorage } from './storage';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

initStorage();

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit
function showMenu(){
    console.log(`\n=== TO-DO MENU ===`);
    console.log('1. Add new todo');
    console.log('2. Mark todo as complete');
    console.log('3. Delete todo');
    console.log('4. List all todos');
    console.log('5. Search todos');
    console.log('6. Exit');
}

function displayTodos(todos: any[]) {
  if (todos.length === 0) {
    console.log('Tidak ada todo.');
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.completed ? '[DONE]' : '[ACTIVE]';
    console.log(`${status} ${index + 1}. ${todo.text} (ID: ${todo.id})`);
  });
}
// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input
// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

function main() {
  showMenu();

  rl.question('Pilih menu: ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Masukkan todo: ', (text) => {
          if (!isValidString(text)) {
            console.log('Input tidak valid!');
          } else {
            const todo = addTodo(text);
            console.log('Todo ditambahkan:', todo.text);
          }
          main();
        });
        break;

      case '2':
        rl.question('Masukkan ID todo: ', (id) => {
          const success = completeTodo(Number(id));
          console.log(success ? 'Berhasil!' : 'ID tidak ditemukan');
          main();
        });
        break;

      case '3':
        rl.question('Masukkan ID todo: ', (id) => {
          const success = deleteTodo(Number(id));
          console.log(success ? 'Terhapus!' : 'ID tidak ditemukan');
          main();
        });
        break;

      case '4':
        displayTodos(listTodos());
        main();
        break;

      case '5':
        rl.question('Keyword: ', (keyword) => {
          displayTodos(searchTodos(keyword));
          main();
        });
        break;

      case '6':
        console.log('Bye!');
        rl.close();
        break;

      default:
        console.log('Pilihan tidak valid!');
        main();
    }
  });
}


// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');
main();