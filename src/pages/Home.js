import {useContext, useEffect, useState} from "react";
import {todaycontext} from "../App";
import CustomButton from "./../components/Button";
import NewDate from "./../components/Date";
import ListText from "../components/ListText";

const Home = () => {
    const todayList = useContext(todaycontext);
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`;

    useEffect(()=>{
        if(todayList.length >= 1){
        const firstDate = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDate = new Date(
            curDate.getFullYear(),
            curDate.getMonth()+1,
            0,
            23,
            59,
            59
        ).getTime();
            console.log(new Date().getTime());
        setData(todayList.filter((it)=> firstDate <= it.date && it.date <= lastDate)
        );
        }
    },[todayList, curDate]);
    
    useEffect(()=>{
        console.log(data);
    }, [data]);
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1,  curDate.getDate()));
    };
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    };
    return (
        <div>
            <NewDate 
            headText={headText}
            leftBtn={<CustomButton text={"<"} onClick={decreaseMonth}/>}
            rightBtn={<CustomButton text={">"} onClick={increaseMonth}/>}
            />
            <h1>Home</h1>
            <p>Yes</p>
            <ListText todayList={data} />
        </div>
    );
};
export default Home;