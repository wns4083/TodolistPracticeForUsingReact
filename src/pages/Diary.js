import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { todaycontext } from "../App";
import { getStringDate } from "../functions/getStringDate";
import CustomButton from "../components/Button";
import NewDate from '../components/Date';
import { starList } from "../functions/starList";
const Diary = () => {
    const {id} = useParams();
    const todayList = useContext(todaycontext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=>{
        if(todayList.length >=1){
            const targetList = todayList.find((it)=> parseInt(it.id) === parseInt(id));
        if(targetList){
            setData(targetList);
        }else{
            alert("없어요");
            navigate('/',{replace:true});
        }
      }
    }, [id, todayList]);
    if(!data){
        return <div className="listDetail">로딩중입니다.</div>
    }else{
        const curStarValue = starList.find((it)=>parseInt(it.star_id)===parseInt(data.star));
        console.log(curStarValue);
    return (
        <div className="listDetail">
            <NewDate headText={`오늘은 ${getStringDate(new Date(data.date))}`}
                  leftBtn={<CustomButton text={"<뒤로가기"} onClick={() => navigate(-1)}/>}
                  rightBtn={<CustomButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)}/>}
            />
            <article>
                <section>
                    <h4>오늘</h4>
                    <div className={["List_wrraper", `List_wrraper_${data.star}`,].join(" ")}>
                        <div className="star_descript">
                            {curStarValue.star_descript}</div>
                    </div>
                </section>
            </article>
            <section>
                <h4>기록</h4>
                <div className="list_content_wrraper">
                    <p>{data.content}</p>
                </div>
            </section>
        </div>
    );
    }
};
export default Diary;