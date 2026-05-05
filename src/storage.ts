import * as fs from 'fs';
import * as path from 'path';
import { Todo } from './types';
import { isTodoArray } from './utils';

// TODO: Definisikan path file untuk menyimpan data To-Do
const dataDir = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDir, 'todos.json');

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file
export function readTodos(): Todo[]{
    try{
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(data);

        if(isTodoArray(parsed)){
            return parsed.map(todo => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
            }));
        }

        return [];
    }catch(error){
        console.error("Error reading file:", error);
        return [];
    }
}

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan
export function saveTodos(todos: Todo[]){
    try{
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    }catch(error){
        console.error('Error saving file', error);
    }
}

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
export function initStorage(){
    if(!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, '[]', 'utf-8');
    }
}