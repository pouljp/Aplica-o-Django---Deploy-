import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api/api';
import './TaskList.css';


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getTasks();
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            const response = await addTask({ title: newTaskTitle, completed: false });
            setTasks([response.data, ...tasks]);
            setNewTaskTitle('');
        }
    };

    const handleEditTask = async (id) => {
        const response = await updateTask(id, { title: editTaskTitle, completed: tasks.find(task => task.id === id).completed });
        setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        setEditTaskId(null);
        setEditTaskTitle('');
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleCompleted = async (id) => {
        const task = tasks.find(task => task.id === id);
        const updatedTask = { ...task, completed: !task.completed };
        const response = await updateTask(id, updatedTask);
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
    };

    return (
        <div className="container">
            <h1 className="title">Lista de Tarefas</h1>

            <div className="task-input-container">
                <input
                    type="text"
                    placeholder="Nova Tarefa"
                    className="task-input"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button className="add-button" onClick={handleAddTask}>Adicionar</button>
            </div>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompleted(task.id)}
                        />
                        {editTaskId === task.id ? (
                            <input
                                type="text"
                                className="task-input"
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                            />
                        ) : (
                            <span className="task-text">{task.title}</span>
                        )}
                        <div className="task-buttons">
                            {editTaskId === task.id ? (
                                <>
                                    <button className="edit-button" onClick={() => handleEditTask(task.id)}>Salvar</button>
                                    <button className="delete-button" onClick={() => setEditTaskId(null)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-button" onClick={() => { setEditTaskId(task.id); setEditTaskTitle(task.title); }}>Editar</button>
                                    <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Excluir</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
