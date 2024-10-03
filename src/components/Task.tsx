import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { TasksCreated } from './TasksCreated';
import  Clipboard  from '../assets/Clipboard.svg';
import styles from './Task.module.css';
import { TotalTasks } from './TotalTasks';



export interface TaskId{
    id: number;
    text: string;
    completed: boolean;
}

export function Task(){

    const [tasks, setNewTask] = useState<TaskId[]>([]);

    const [newTaskText, setNewTaskText] = useState('');

    const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
        if (currentTask.completed) {
          return prevValue + 1
        }
    
        return prevValue
      }, 0)


    function handleCreateNewTask(event: FormEvent){
        event.preventDefault();

        const newTask: TaskId ={
            id: new Date().getTime(),
            text: newTaskText,
            completed: false,
        }

        setNewTask((tasks) =>[...tasks, newTask]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewTaskText(event.target.value);
        event.target.setCustomValidity('');
      }

    function handleTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Adicione uma tarefa primeiro!');
    }
    

    function deleteTask(id: number){
        const taskDelete = tasks.filter((task) => task.id !== id)
        setNewTask(taskDelete);

    }

    function handleToggleTask({ id, value }: { id: number; value: boolean }) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: value }
          }
    
          return { ...task }
        })
    
        setNewTask(updatedTasks)
      }

    return(
  <>   
    <div className={styles.taks}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
            <textarea 
                required
                name="" 
                placeholder="Adicione uma nova tarefa"
                value={newTaskText}
                onChange={handleNewTaskChange}
                onInvalid={handleTaskInvalid}
                />
            <button type="submit">Criar +</button>
        </form>

    </div>
    <div className={styles.countTaskContainer}>
        <TotalTasks
        totalTasks={tasks.length}
        checkedTasksCounter={checkedTasksCounter}
        />
        </div>

    <div className={styles.tasksList}>
    {tasks.length > 0 ? (
        <div className={styles.containerTask}>
          {tasks.map((task) =>(
            <TasksCreated
            key={task.id}
            content={task}
            remove={deleteTask}
            taskStatus={handleToggleTask}
            />
             ))  
           }
        </div>
        ) : (
        <div className={styles.containerBoard}>
          <div>
            <img className={styles.board} src={Clipboard} alt="" />
            <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                Crie tarefas e organize seus itens a fazer 
            </p>
          </div>
        </div>
    )}
    </div>
  </>
    )
}