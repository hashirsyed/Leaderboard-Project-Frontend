
function Card({children,className}){
        return (
            
            <>
            <div className={className} style={{borderRadius : "10px", padding : "10px 20px",display:"inline-block",marginLeft:"10px",marginTop:"20px",border:"1px solid lightGray"}}>
            {children}

            </div>
            </>



)

}

export default Card;