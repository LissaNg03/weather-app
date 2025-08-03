import { useEffect, useRef, useState } from "react";

export default function SmallerCard(props){
    
    const [date, setDate] = useState("")
    const monthString = useRef(props.data.dt_txt.slice(5,7));
    const [month, setMonth] = useState("");
    const [weatherDescr, setWeatherDescr] = useState(props.data.weather[0].main);
    const [weatherImg, setWeatherImg] = useState("");

    useEffect(()=>{
        setDate(props.data.dt_txt.slice(8,10));

        switch(monthString.current){

            case "01" : setMonth("Jan");
            break;

            case "02" : setMonth("Feb");
            break;

            case "03" : setMonth("Mar");
            break;

            case "04" : setMonth("Apr");
            break;

            case "05" : setMonth("May");
            break;

            case "06" : setMonth("Jun");
            break;

            case "07" : setMonth("Jul");
            break;

            case "08" : setMonth("Aug");
            break;

            case "09" : setMonth("Sep");
            break;

            case "10" : setMonth("Oct");
            break;

            case "11" : setMonth("Nov");
            break;

            case "12" : setMonth("Dec");
            break;              
        }

        setWeatherDescr(props.data.weather[0].main);

        if(weatherDescr === "Rain"){    
            setWeatherImg('/public/WeatherAssets/heavy-rain.png')
        }
        else if(weatherDescr === "Clouds"){
            setWeatherImg('/public/WeatherAssets/cloudy.png')
        }
        else if(weatherDescr === "Clear"){
            setWeatherImg('/public/WeatherAssets/sun.png')
        }
    },[props.data, weatherDescr.current])

    return(<>
         <div>
                <h2>{month} {date}</h2>
                 <img src={weatherImg} alt="" width={30} />
                 <h3>{Math.round(props.data.main.temp - 273.15)} ℃</h3>
         </div>
    </>)
}