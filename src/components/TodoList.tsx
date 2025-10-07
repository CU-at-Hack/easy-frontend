import {DeleteOutlined} from '@ant-design/icons';
import {Button, Checkbox, List, Space, Typography} from 'antd';

import type { Todo } from '../types.ts';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onToggle: (todo: Todo) => void;
}

export default function TodoList({ todos, onDelete, onToggle }: TodoListProps) {
    return (
        <List
            style={{ marginTop: 16 }}
            dataSource={todos}
            locale={{ emptyText: 'Задач пока нет' }}
            renderItem={(todo) => (
                <List.Item
                    actions={[
                        <Button
                            type='text'
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(todo.id)}
                        />,
                    ]}
                >
                    <Space>
                        <Checkbox checked={todo.completed} onChange={() => onToggle(todo)} />
                        <Typography.Text
                            delete={todo.completed}
                            style={{ opacity: todo.completed ? 0.5 : 1 }}
                        >
                            {todo.title}
                        </Typography.Text>
                    </Space>
                </List.Item>
            )}
        />
    );
}
