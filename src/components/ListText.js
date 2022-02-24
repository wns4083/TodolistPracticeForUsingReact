import {useState} from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import ListItem from "./ListItem";

const sortOptionList = [
    {value: "lastest", name: "최신순"},
    {value: "oldest", name: "오래된순"},
];
const fliterStart = [
    {value: "all", name: "모두"},
    {value: "good", name: "좋았어!"},
    {value: "notbed", name: "아까웠어"},
];
const ControlMenu = ({value, onChange, optionList}) => {
    return (
    <select className="ControlMenu" value={value} onChange={(e)=> onChange(e.target.value)}>
        {optionList.map((it, idx)=><option key={idx} value={it.value}>{it.name}</option>)}
    </select>
    );
};

const ListText = ({todayList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('lastest');
    const [filter, setFilter] = useState("all");
    
    const listRearrange = () => {
        const filterCallback = (item) => {
            if(filter === 'good'){
                return parseInt(item.star) <= 3;
            }else{
                return parseInt(item.star) > 3;
            }
        };
        const compare = (a,b) => {
            if (sortType === 'lastest'){
                return parseInt(b.date) - parseInt(a.date);
            }else{
                return parseInt(a.date) -parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(todayList)); /*배열 깊은복사 제이슨이 문자화 파스로 배열화 */
        const filterStar = filter === 'all' ? copyList : copyList.filter((it)=> filterCallback(it));
        const sortedList = filterStar.sort(compare);
        return sortedList;
        
    };
    return (
    <div className="ListText">
        <div className="menu_wrapper">
            <div className="left_col">
            <ControlMenu 
                value={sortType} 
                onChange={setSortType} 
                optionList={sortOptionList} />
            <ControlMenu
                value={filter}
                onChange={setFilter}
                optionList={fliterStart} />
            </div>
            <div className="right_col">
                <CustomButton
                    type={"Done"}
                    text={"새 일정기록"}
                    onClick={()=> navigate("/new")}/>
            </div>
        </div>
        {listRearrange().map((it)=> (
            <ListItem key={it.id} {...it} />
        ))}
    </div>
    );
};
ListText.defaultProps = {
    todayList: [],
};
export default ListText;