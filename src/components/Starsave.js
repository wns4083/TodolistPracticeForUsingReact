const Starsave = ({star_id, star_descript, onClick, isSelected}) => {
    return (
    <div 
        onClick={()=>onClick(star_id)}
        className={[
            "starItem", 
            isSelected ? `starItem_on_${star_id}` : `starItem_off`,].join(" ")}>
        <span>{star_descript}</span>
        <span>{star_id}</span>
    </div>
    );
};
export default Starsave;