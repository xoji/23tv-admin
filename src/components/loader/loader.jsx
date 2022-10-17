import './loader.css'
export default function Loader({ margin }) {
    return (
        <>
       <div className="body">
       <div className="container-loader" style={{marginTop: margin ? `${margin}px` : "0"}}>
        <div className="loader" >
            <div className="circle" id="a"></div>
            <div className="circle" id="b"></div>
            <div className="circle" id="c"></div>
        </div>
        <div className="caption" style={{marginTop: '100px'}}>We are almost there...</div>
        </div>
       </div>
        </>
    )
}