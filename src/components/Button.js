const CustomButton = ({text, type, onClick}) => {
    return (
        <button className={["CustomButton", `CustomButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};
CustomButton.defaultProps = {
    type: "default",
};
export default CustomButton;