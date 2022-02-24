import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {todaycontext} from "../App";
import ListEditor from "../components/ListEditor";
const Edit = () => {
    const [originData,setOriginData]= useState();
    const navigate = useNavigate();
    const {id} = useParams();
    
    const todayList = useContext(todaycontext);
    console.log(todayList);
    useEffect(()=>{
        if(todayList.length >=1){
            const targetList = todayList.find(
                (it)=> parseInt(it.id) === parseInt(id)
                );
            console.log(targetList);
            if(targetList){
                    setOriginData(targetList);
            }else{
                navigate("/",{replace:true});
            }
        }
    }, [id, todayList]);
    return (
        <div>
            {originData && <ListEditor isEdit={true} originData={originData} />}
        </div>
    );
};
export default Edit;