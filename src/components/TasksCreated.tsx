import { Trash, Check } from 'phosphor-react';

import {TaskId} from '../components/Task';

import styles from './TasksCreated.module.css'

interface TasksCreatedProps{
    content: TaskId;
    remove: (id: number) => void;
    taskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function TasksCreated({content, remove, taskStatus}: TasksCreatedProps){

    function handleTaskToggle() {
        taskStatus({ id: content.id, value: !content.completed })
      }

    function handleDeleteTask(){
        remove(content.id);
    }

    const checkboxCheckedClassname = content.completed 
    ? styles['checkbox-checked'] 
    : styles['checkbox-unchecked']

     const paragraphCheckedClassname = content.completed
     ? styles['paragraph-checked']
     : ''

    return (
    <div className={styles.container}>
        <div>
            <label htmlFor="checkbox" onClick={handleTaskToggle}>
                <input readOnly type="checkbox" checked={content.completed} />
                <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                {content.completed && <Check size={12} />}
                </span>

                <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
                    {content.text}
                </p>
            </label>
        </div>

        <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={16} color="#808080"/>
        </button>
    </div>
    )
}