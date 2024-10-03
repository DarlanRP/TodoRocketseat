import styles from './TotalTasks.module.css';

interface Props{
    totalTasks: number;
    checkedTasksCounter: number;
}

export function TotalTasks({totalTasks, checkedTasksCounter}: Props){
    return(
        <div className={styles.container}>
            <div>
                <p>Tarefas Criadas: <span>{totalTasks}</span></p>
            </div>

            <div>
                <p>Concluídas: <span>{totalTasks === 0 ? totalTasks : `${checkedTasksCounter} de ${totalTasks}`}</span></p>
            </div>
        </div>
    )
}