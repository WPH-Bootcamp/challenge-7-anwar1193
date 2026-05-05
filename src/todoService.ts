// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts
import { Todo } from "./types";

// TODO: Import fungsi storage untuk baca/tulis file
import { readTodos, saveTodos } from "./storage";

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active
function generateId(): number {
    return Date.now();
}

export function addTodo(text: string): Todo{
    const todos = readTodos();

    if(!text.trim()){
        throw new Error('Text tidak boleh kosong');
    }

    const newTodo: Todo = {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date()
    };

    todos.push(newTodo);
    saveTodos(todos);

    return newTodo;
}

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan
export function completeTodo(id: number): boolean{
    const todos = readTodos();
    const todo = todos.find(t => t.id === id);

    if(!todo) return false;

    todo.completed = true;
    saveTodos(todos);

    return true;
}

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan
export function deleteTodo(id: number): boolean{
    const todos = readTodos();
    const newTodos = todos.filter(t => t.id !== id);

    if(todos.length === newTodos.length) return false;

    saveTodos(newTodos);
    return true;
}

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih
export function listTodos(): Todo[] {
    return readTodos();
}

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword
export function searchTodos(keyword: string): Todo[] {
    const todos = readTodos();
    return todos.filter(t => t.text.toLowerCase().includes(keyword.toLowerCase()));
}