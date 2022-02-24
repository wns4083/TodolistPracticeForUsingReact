import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';


import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
//components
import CustomButton from './components/Button';
import FHeader from './components/Header';

const reducer = (state, action) =>{
  let newState = [];
  switch(action.type){
    case 'Init':{
      return action.data;
    }
    case 'Create':{
      newState =[action.data, ...state];
      break;
    }
    case 'Remove':{
      newState = state.filter((it)=>it.id !==action.targetId);
      break;
    }
    case 'Edit':{
      newState = state.map((it)=>
      it.id ===action.data.id ? {...action.data} : it
      );
      break;
    }
    default:
    return state;
  }
  sessionStorage.setItem('itValue', JSON.stringify(newState))
  return  newState;
};
export const todaycontext = React.createContext();
export const dispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer,[]);
  const dataId = useRef(6);
  const onCreate = (date, content, star)=>{
    dispatch({
      type:"Create",
      data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      star,
    },
  });
    dataId.current +=1;
  };
  const onRemove = (targetId) => {
    dispatch({type: "Remove", targetId});
  };
  const onEdit = (targetId, date, content, star) =>{
    dispatch({
      type: "Edit",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        star,
      },
    });
  };
  
  return (
    <todaycontext.Provider value={data}>
      <dispatchContext.Provider 
      value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
    <BrowserRouter>
    <div className="App">
      <FHeader subword={"for week"} mainword={"Fine wall"}/>
      <section className='mainWrrap'>
      <div className='controller'>
      <CustomButton text={"확인"}
       onclick={()=> alert("확인")}
       type={"Done"}
      />
      <CustomButton text={"수정"}
       onclick={()=> alert("확인")}
       type={"Miss"}
      />
      <CustomButton text={"삭제"} onclick={()=> alert("기본클릭")}/>
      </div>
      <h2>HI my project</h2>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/new' element={<New/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/diary/:id' element={<Diary/>}/>
      </Routes>
      </section>
    </div>
    </BrowserRouter>
    </dispatchContext.Provider>
    </todaycontext.Provider>
  );
}

export default App;
