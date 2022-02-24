const NewDate = ({headText, leftBtn, rightBtn}) =>{
    return (
        <div className="dateControl">
        <div className="head_btn_left">{leftBtn}</div>
        <div className="head_text">{headText}</div>
        <div className="head_btn_right">{rightBtn}</div>
        </div>
    );
};

export default NewDate;