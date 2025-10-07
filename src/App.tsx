import {Card, message} from 'antd';
import Title from 'antd/es/typography/Title';
import {useEffect, useState} from 'react';
import {createTodo, deleteTodo, getTodos, updateTodo} from './api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import type { Todo } from './types';
function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [, setLoading] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        setLoading(true);
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            message.error(`Ошибка при загрузке задач ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (todo: Todo) => {
        try {
            const newTodo = await createTodo(todo);
            setTodos((prev) => [...prev, newTodo]);
            message.success('Задача добавлена');
        } catch {
            message.error('Не удалось добавить задачу');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t.id !== id));
            message.success('Задача удалена');
        } catch {
            message.error('Ошибка при удалении');
        }
    };

    const handleToggle = async (todo: Todo) => {
        const updated = { ...todo, completed: !todo.completed };
        try {
            await updateTodo(updated);
            setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
        } catch {
            message.error('Ошибка при обновлении');
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f5f5',
                padding: 24,
            }}
        >
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>
                    Todo List
                </Title>
                <AddTodo onAdd={handleAdd} />
                <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
            </Card>
        </div>
    );
}

export default App;
