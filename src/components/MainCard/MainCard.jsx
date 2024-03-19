import React, { useEffect, useState } from 'react'
import './MainCard.css'
import cloudy from '../../assets/Home/cloudy-graphic-clipart-design-free-png.webp'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import Sidebar from '../Sidebar/Sidebar'
import Chart from '../Chart/Chart';



function MainCard() {


    const [currenttime, setCurrenttime] = useState("")
    // console.log(currenttime)

    setInterval(() => {
        // Create a new Date object
        const currentDate = new Date();

        // Get the current hours, minutes, and AM/PM
        let hours = currentDate.getHours();
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = String(hours).padStart(2, '0'); // Ensure two digits for hours
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
        setCurrenttime(formattedTime);

    }, 1000)


    const [input, setInput] = useState("")
    const [cityName, setCityName] = useState("Delhi")

    const [sameNameCities, setSameNameCitites] = useState([{
        "name": "Delhi",
        "local_names": {
            "uk": "Делі",
            "fa": "دهلی",
            "ja": "デリー",
            "fr": "Delhi",
            "te": "ఢిల్లీ",
            "el": "Δελχί",
            "bn": "দিল্লি",
            "ru": "Дели",
            "lv": "Deli",
            "th": "เดลี",
            "cs": "Dillí",
            "ne": "दिल्ली",
            "de": "Delhi",
            "ar": "دلهي",
            "he": "דלהי",
            "ms": "Delhi",
            "pa": "ਦਿੱਲੀ",
            "zh": "德里",
            "ko": "델리",
            "ku": "Delhî",
            "eo": "Delhio",
            "ur": "دہلی",
            "ta": "தில்லி",
            "ml": "ഡെൽഹി",
            "pt": "Deli",
            "oc": "Delhi",
            "kn": "ದೆಹಲಿ",
            "hi": "दिल्ली",
            "en": "Delhi",
            "my": "ဒေလီမြို့",
            "es": "Delhi"
        },
        "lat": 28.6517178,
        "lon": 77.2219388,
        "country": "IN",
        "state": "Delhi"
    }])

    const [dropdown, setDropdown] = useState(false)


    const [requiredCity, setRequiredCity] = useState({
        "name": "Delhi",
        "local_names": {
            "uk": "Делі",
            "fa": "دهلی",
            "ja": "デリー",
            "fr": "Delhi",
            "te": "ఢిల్లీ",
            "el": "Δελχί",
            "bn": "দিল্লি",
            "ru": "Дели",
            "lv": "Deli",
            "th": "เดลี",
            "cs": "Dillí",
            "ne": "दिल्ली",
            "de": "Delhi",
            "ar": "دلهي",
            "he": "דלהי",
            "ms": "Delhi",
            "pa": "ਦਿੱਲੀ",
            "zh": "德里",
            "ko": "델리",
            "ku": "Delhî",
            "eo": "Delhio",
            "ur": "دہلی",
            "ta": "தில்லி",
            "ml": "ഡെൽഹി",
            "pt": "Deli",
            "oc": "Delhi",
            "kn": "ದೆಹಲಿ",
            "hi": "दिल्ली",
            "en": "Delhi",
            "my": "ဒေလီမြို့",
            "es": "Delhi"
        },
        "lat": 28.6517178,
        "lon": 77.2219388,
        "country": "IN",
        "state": "Delhi"
    })

    const [weatherdata, setweatherdata] = useState([])
    const [temperature, setTemperature] = useState("")
    const [description, setDescription] = useState("")
    const [weatherfilter, setweatherfilter] = useState([])
    const [weatherTimeFilterforChart, setweatherTimeFilterforChart] = useState([])


    const [presentDate, setPresentDate] = useState("")

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
                    params: {
                        q: cityName,
                        limit: 5,
                        appid: 'eb1ace0f7cc8f7c2f136f97bccdc122e'
                    }
                });
                setSameNameCitites(response.data)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCities()

    }, [cityName])

    function handleCityClick(item) {
        setRequiredCity(item)
        console.log("Clicked on:", item);
        setDropdown(false)
    }



    useEffect(() => {
        const fetchWeather = async () => {
            try {
                let response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        lat: requiredCity.lat ? requiredCity.lat : sameNameCities[0].lat,
                        lon: requiredCity.lon ? requiredCity.lon : sameNameCities[0].lon,
                        appid: 'eb1ace0f7cc8f7c2f136f97bccdc122e'
                    }
                });
                setweatherdata(response.data.list);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeather();
    }, [requiredCity]);


    useEffect(() => {
        let fetchWeather = async () => {
            try {
                let response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        lat: requiredCity.lat ? requiredCity.lat : sameNameCities[0].lat,
                        lon: requiredCity.lon ? requiredCity.lon : sameNameCities[0].lon,
                        appid: 'eb1ace0f7cc8f7c2f136f97bccdc122e'
                    }
                })
                console.log(response.data.list)
                setweatherdata(response.data.list)
                setTemperature(weatherTimeFilter[0].main.temp)

            } catch (error) {
                console.log(error)
            }
        }

        fetchWeather()
    }, [requiredCity])

    useEffect(() => {
        const currentDate = new Date();
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const date = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
        const formattedDateTime = `${date} ${month} ${day}`;
        console.log(formattedDateTime);
        setPresentDate(formattedDateTime);
    }, [])

    useEffect(() => {
        const currentDate = new Date(); // Get current date in local time
        const timezoneOffsetInMilliseconds = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const currentUTCDate = new Date(currentDate.getTime() - timezoneOffsetInMilliseconds); // Get current date in UTC
        const currentDateString = currentUTCDate.toISOString().split('T')[0]; // Format current date to string in 'YYYY-MM-DD' format
    
        // Filter the weather data based on the date
        const weatherFiltered = weatherdata.filter((val) => {
            // Extract date from dt_txt (assuming it's in UTC)
            const weatherDate = new Date(val.dt * 1000).toISOString().split('T')[0];
            return weatherDate === currentDateString; // Check if the weather date is the same as the current date
        });
    
        setweatherfilter(weatherFiltered);
    }, [weatherdata]);
    
    
    let weatherTimeFilter = weatherfilter.filter((val, ind) => {
        // Extract date and time parts from val.dt_txt
        const [datePart, timePart] = val.dt_txt.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');

        // Create a new Date object from the parsed parts
        const valDate = new Date(year, month - 1, day, hour, minute, second);

        // Compare the date with the current date
        return valDate.getTime() <= new Date().getTime();
    });


    useEffect(()=>{
        let weatherTimeFilterforCharted = weatherdata.filter((val, ind) => {
            // Extract date and time parts from val.dt_txt
            const [datePart, timePart] = val.dt_txt.split(' ');
            const [year, month, day] = datePart.split('-');
            const [hour, minute, second] = timePart.split(':');
    
            // Create a new Date object from the parsed parts
            const valDate = new Date(year, month - 1, day, hour, minute, second);
    
            // Compare the date with the current date
            return valDate.getTime() >= new Date().getTime(); 
        });
        setweatherTimeFilterforChart(weatherTimeFilterforCharted)
    },[weatherdata])
 



    useEffect(() => {
        if (weatherTimeFilter.length > 0) {
            let presentweather = weatherTimeFilter[weatherTimeFilter.length - 1].main.temp;
            setTemperature(presentweather);
            let presentdes = weatherTimeFilter[weatherTimeFilter.length - 1].weather[0].description;
            let presentdescription = presentdes.split(" ").map((val) => val.charAt(0).toUpperCase() + val.slice(1)).join(" ");
            setDescription(presentdescription)
        }
    }, [weatherTimeFilter]);


    console.log(weatherfilter)
    console.log(weatherdata)
    return <>
        <div className='d-flex  flex-md-row-reverse'>
            <Sidebar temperature={temperature} description={description} requiredCity={requiredCity} presentweather={weatherTimeFilter[weatherTimeFilter.length - 1]}  alldata={weatherdata}/>
            <div>
                <div className="container-fluid d-flex justify-content-center">
                    <div className='inner-part'>
                        <div className='d-flex justify-content-between card-details flex-row-reverse'>
                            <div className='left-side'>
                                <div className='d-flex flex-column align-items-end justify-content-between' style={{ height: "100%" }}>
                                    <InputGroup className="input-group">
                                        <Form.Control
                                            placeholder="Search City"
                                            className='input-field'
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <Button variant="outline-light" id="button-addon2" onClick={() => {
                                            setDropdown(true)
                                            setCityName(input)
                                        }
                                        }>
                                            Search
                                        </Button>
                                    </InputGroup>
                                    {
                                        dropdown &&
                                        <>
                                            <ul className="list-group" style={{ width: '70%' }}>
                                                {sameNameCities.map((val, ind) => {
                                                    return <li key={ind} className="list-group-item d-flex justify-content-between dropdown" onClick={() => handleCityClick(val)}>
                                                        <div className='address'>
                                                            {val.name}, {val.state}, {val.country}
                                                        </div>
                                                        <div className='lanlon'>
                                                            {val.lat}. {val.lon}
                                                        </div>
                                                    </li>;
                                                })}
                                            </ul>
                                            {console.log(sameNameCities)}

                                        </>

                                    }
                                    <img src={cloudy} alt="" className='cloud' />
                                </div>

                            </div>
                            <div className='weather-details d-flex flex-column gap-5 '>
                                <div className='d-flex align-items-center flex-column'>
                                    <h1 className='cityname'>{requiredCity.name}</h1>
                                    <h1>{currenttime}</h1>
                                    <h6>{presentDate}</h6>
                                </div>
                                <div className='d-flex align-items-center flex-column'>
                                    <h6>Weather Forecast</h6>
                                    <h3>{description}</h3>
                                    <h3>{(temperature - 273.15).toFixed(2)}&deg; C</h3>
                                    {/* {console.log(weatherfilter)} */}
                                    {/* {console.log(temperature)} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Chart timefilter= {weatherTimeFilterforChart}/>
            </div>
        </div>
    </>
}

export default MainCard