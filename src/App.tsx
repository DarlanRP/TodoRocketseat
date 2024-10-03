import { Header } from './components/Header';
import './global.css';

import styles from './App.module.css';
import { Task } from './components/Task';


function App(){
  return(
    <div>
      <Header/>
      <div className={styles.content}>
        <Task/>  
      </div>
    </div>
  )
}

export default App;