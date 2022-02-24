const FHeader = ({subword, mainword}) => {
    return (
        <header>
            <div className="head_logo"><img src={process.env.PUBLIC_URL + `/Todolist_logo.png`}></img></div>
            <div className="head_subword">{subword}</div>
            <div className="head_mainword">{mainword}</div>
        </header>
    );
};
export default FHeader;