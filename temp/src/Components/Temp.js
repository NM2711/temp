import React,{useState} from 'react'
import './Style.css';
import axios from 'axios';
import {round} from 'mathjs'
import moment from 'moment'




const Temp = () => {

 

  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image:'/Image/sun.png'
  }) 
   const [name,setName] = useState('');
   const [error,setError] = useState('');
 

  const handleClick=()=>{
    if(name!==""){
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2cfd4086ccecca3abfee0c4810c8500a&units=metric`;
axios.get(apiUrl)
.then(res=>{
  let imagePath='';
  if(res.data.weather[0].main ==='Clouds'){
    imagePath="/Image/clouds.png"
  } else if(res.data.weather[0].main ==="Clear"){
    imagePath="/Image/sun.png"
  } else if(res.data.weather[0].main ==="Rain"){
    imagePath="/Image/rain.png"
  } else if(res.data.weather[0].main ==="Drizzle"){
    imagePath="/Image/drizzle.png"
  } else if(res.data.weather[0].main ==="Haze"){
    imagePath="/Image/haze.png"
  } else if(res.data.weather[0].main ==="Mist"){
    imagePath="/Image/mist.png"
  } 
  else{imagePath = "sun.png"}


  console.log(res.data);
  
  setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image:imagePath})
  setError("")
})  
  .catch( error=>{
    if(error.response.status===404){
    setError("Invalid City Name")
    } else {
      setError("")
    }
    console.log(error)

  });
    }
  }

  
  return (
    <>
    
    <div className="container">
      
        <div className="weather"> 
        {moment().format('dddd , MMMM Do YYYY, h:mm:ss a')}

      <div className="Search">
            <input type="search" placeholder='Enter the city' onChange={e => setName(e.target.value)} />
        <button>
          <img src="/Image/search.png"  onClick={handleClick} alt=""/>
        </button>
        
      
        </div>
        <div className="error">
          <p>{error}</p>
        </div>

        <div className="winfo">
          <img src={data.image} alt=""/>
          <h3>{round(data.celcius)}°C</h3>
          <h4>{data.name}</h4>

          <div className="details">
            <div className="col">
              <img src="/Image/humidity.png"alt=""/>
              <div className="humidity">
               <p>{round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            
            <div className="col">
              <img src="/Image/wind.png"alt=""/>
              <div className="wind">
                <p>{round(data.speed)}km/h</p>
                <p> Wind</p>
                 </div>
            </div>

          </div>
        </div>
        </div>
       
    </div>
    </>
  )
}

export default Temp
