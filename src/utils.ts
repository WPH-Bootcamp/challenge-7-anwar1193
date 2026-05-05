// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime
import { Todo } from "./types";

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid
export function isTodo(obj: any): obj is Todo {
    return(
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'number' &&
        typeof obj.text === 'string' && 
        typeof obj.completed === 'boolean' &&
        typeof obj.createdAt === 'string'
    );
}

// Validasi array Todo
export function isTodoArray(data: any): data is Todo[]{
    return Array.isArray(data) && data.every(isTodo);
}

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
export function formatDate(date: Date): string {
    return date.toLocaleDateString();
}

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
export function isValidString(input: any): input is string{
    return typeof input === 'string' && input.trim().length > 0;
}
