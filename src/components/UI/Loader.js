import Loader from "react-loader-spinner";
const LoaderComp = (props)=>{
    
    const type = props.type || 'Puff';
    const color = props.color || "rgb(255, 0, 0)";
    const height = props.height || 70;
    const width = props.width || 70;

    return(
        <Loader
        type={type}
        color={color}
        height={height}
        width={width}
        />          
    );
}
export default LoaderComp;