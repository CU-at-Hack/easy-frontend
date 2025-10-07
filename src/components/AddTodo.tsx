import {Button, Form, Input} from 'antd';
import {FormEvent, useState} from 'react';
import type {Todo} from '../types';

interface AddTodoProps {
  onAdd: (todo: Todo) => void
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    }
    onAdd(newTodo)
    setTitle("")
  }

  return (
    <Form layout="inline" onSubmitCapture={handleSubmit} style={{ marginTop: 16 }}>
      <Form.Item style={{ flex: 1 }}>
        <Input
          placeholder="Введите задачу"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}