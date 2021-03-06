import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav';
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';

export default function Home({todoList}) {
  let todoAppDiv = useRef()
  let [themeColor,setThemeColor] = useState(null)
  let [myTodoList,setMyTodoList] = useState(todoList)
  useEffect(()=>{
    console.log('app rendered')
    let theme_color = localStorage.getItem('themeColor')
    if(!theme_color){ localStorage.setItem('themeColor','light')}
    setThemeColor(theme_color)
  },[])
  return (
    <div className={`mdbTodo ${themeColor!==null?themeColor:''}`} ref={todoAppDiv}>
      <Head>
        <title>Mongodb TodoApp | Anthony16t</title>
        <meta name="description" content="A todo app with dark mode using next js and mongodb." />
        <link rel="icon" type="image/png" href="/favicon.png" />        
      </Head>
      <Nav themeColor={themeColor} setThemeColor={setThemeColor}/>
      <div className="todoList">
        {myTodoList.map(todo=><Todo key={todo._id} id={todo._id} isDone={todo.status==='done'?true:false}
        name={todo.name} myTodoList={myTodoList} setMyTodoList={setMyTodoList} />)}
      </div>
      <NewTodo myTodoList={myTodoList} setMyTodoList={setMyTodoList} />
    </div>
  )
}

export async function getServerSideProps({ req, res ,query }){
  const fetchReq = await fetch('http://127.0.0.1:3000/api/todo')
  const todoList = await fetchReq.json()
  return {
    props:{todoList:todoList,query:query}
  }
}

