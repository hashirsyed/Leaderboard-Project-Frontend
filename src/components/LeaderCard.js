import Card from './Card'
import "../App.css"
function LeaderCard({id,name ,description,imageUrl,points,onDelete}){

    return (
        
        <>
        <Card className={"mt-3 w-90"}>
        <div className='flex justify-content-between'>
        <div className='flex'>
          <img src= {imageUrl ||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yn3ZsTyoXw7ISC4lViXDaW7uWZRCPAsM-w&usqp=CAU'} className='img-1'/>
        
        <div style={{marginLeft:'20px',textAlign:"left"}}>
          <h3>{name ||"Name of the leader"}</h3>
          <p>{description ||"Description of the leader"}</p>
        </div>
        </div>
        <div>
          <h2 style={{color:'green'}}>{points || "Points"}</h2>
        </div>
        <button className='btn-3' onClick={()=>onDelete(id)}>Delete</button>
        </div>
      </Card>
        </>



)

}

export default LeaderCard;