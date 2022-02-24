import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext, useEffect } from "react";
import {dispatchContext} from "./../App";
import CustomButton from './Button';
import Starsave from './Starsave';
import {getStringDate} from '../functions/getStringDate';
import {starList} from '../functions/starList';



const ListEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [star, setStar] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit, onRemove} = useContext(dispatchContext);
    const handleMove = (star) =>{
        setStar(star);
    };
    const navigate = useNavigate();

    const handleSubmit = () =>{
        if(content.length <1){
            contentRef.current.focus();
            return;
        }
        if(
            window.confirm(
                isEdit ? "수정하시겠습니까?" : "새로운 기록을 작성하시겠습니까?"))
        {
        if(!isEdit){
            onCreate(date, content, star);
        }else{
            onEdit(originData.id, date, content, star);
        }
    }
        navigate('/',{replace: true})
    };
    const handleRemove = () =>{
        if(window.confirm('삭제 하시겠어요?')){
            onRemove(originData.id);
            navigate('/',{replace:true})
        }
    }

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setStar(originData.star);
            setContent(originData.content);
        }
    },[isEdit,originData]);

    return (
        <div className='ListEditor'>
            <h2 className='subjectName'>오늘의 기록</h2>
            <CustomButton
                className='btn_Edit' 
                text={"< 뒤로가기"} 
                onClick={()=> navigate(-1)} />
            <CustomButton
                className='btn_remove'
                text={'삭제하기'}
                onClick={handleRemove}
                />
        <section className='todayCheck'>
            <h4>오늘은 언제인가요?</h4>
            <div className="input_box">
                <input
                    className='input_content' 
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                    type="date" />
            </div>
        </section>
        <section className='starCheck'>
            <h4>오늘의 평가</h4>
            <div className='star_value'>
                {starList.map((it)=>( <Starsave key={it.star_id} {...it} onClick={handleMove} isSelected={it.star_id === star}/>))}
            </div>
        </section>
        <section>
            <h4>오늘의 여정</h4>
            <div className='textWrrap'>
                <textarea
                placeholder='오늘은 어땠나요'
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </section>
        <section>
            <div className='control_btn'>
                <CustomButton text={"취소하기"} onClick={()=> navigate(-1)}/>
                <CustomButton text={"완료하기"} type={"Done"} onClick={handleSubmit} />
            </div>
        </section>
        </div>
    );
};
export default ListEditor;