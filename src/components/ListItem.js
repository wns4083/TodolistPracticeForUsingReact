import { navigate, useNavigate } from "react-router-dom";
import CustomButton from "./Button";

const ListItem = ({id, star, content, date}) => {
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();

    const moveContent = () =>{
        navigate(`/diary/${id}`);
    };
    const moveEdit = ()=>{
        navigate(`/edit/${id}`);
    }
    return (
    <div className="ListItem">
        <div 
            onClick={moveContent}
            className="contentWrrap">
            <div className="listDate">{strDate}</div>
            <div className="listContent">{content.slice(0.25)}</div>
            <div className={["col", `colstar_${star}`,].join(" ")}>{star}</div>
        </div>
        <div 
            onClick={moveEdit}
            className="btn_right">
            <CustomButton text={"수정하기"} />
        </div>
    </div>
    );
};
export default ListItem;