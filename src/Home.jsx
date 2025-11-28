import "./Home.css"
import "./bootstrap.min.css"



export default function Home(){
  return <div className="home">

                  <h1 id="title"> HealthClinic </h1> 
                <div className="nav">
                
                      <br/><br/><br/>
                      <button className="btn botton"> home </button>
                      <button className="btn botton"> services </button>
                      <button className="btn botton"> our team </button>
                      <button className="btn botton"> Contact </button>
                      <button className="btn  botton">book Appoinment</button>

                </div>
                <div className="content"> <h1> Welcome to health care clinic <br/> <br/>  Your Health, Our Priority </h1> </div>
          
        </div>
    
    
  
}