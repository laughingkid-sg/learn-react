import './App.css';
import { Greet } from './components/Greet'
import { Message } from './components/Message'
import { ClickHandler } from './components/ClickHander';
import { ParentCompoenent } from './components/ParentCompoenent';
import { UserGreeting } from "./components/UserGreeting";
import { NameList } from "./components/NameList"
import { Stylesheet } from "./components/Stylesheet"
import { Inline } from "./components/Inline"
import styles from './appStyles.module.css'
import './appStyles.css'
import { Form } from './components/Form'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import NAMES from './components/data.json'
import { useState, useTransition} from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [inputValue, setInputValue] = useState('')
  const changeHandler = (e) => {
    setInputValue(e.target.value)
    startTransition(() => setQuery(e.target.value))
  }
  const filteredNames = NAMES.filter(e => {
    return e.first_name.includes(query) || e.last_name.includes(query)
  })
  return (
    <div className="App">
      <Greet name='Bruce'>
        <button>Action</button>
      </Greet>
      <Greet name='Clark'>
        <p>This is children props</p>
      </Greet>
      <Message />
      <ClickHandler />
      <ParentCompoenent />
      <UserGreeting />
      <NameList />
      <Stylesheet />
      <Inline />
      <h1 className='error'>Error</h1>
      <h1 className={styles.success}>Success</h1>
      <Form />
      <PostList />
      <PostForm></PostForm>
      <input type='text' value={inputValue} onChange={changeHandler}></input>
      {isPending && 'Updating List...'}
      {
        filteredNames.map((e) => (
          <p key={e.id}>{e.first_name} {e.last_name}</p>
        ))
      }
    </div>

  );
}

export default App;
