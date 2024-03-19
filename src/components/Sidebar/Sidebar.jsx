import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import cloud from '../../assets/Home/cloudy-graphic-clipart-design-free-png.webp'

function Sidebar({ temperature, description, requiredCity, presentweather, alldata }) {

    const [reducedarray, setreducedarray] = useState([])

    useEffect(() => {
        const reduced = alldata.reduce((acc, val) => {
            const date = val.dt_txt.slice(0, 10);
            if (acc[date]) {
                acc[date].push(val);
            } else {
                acc[date] = [val];
            }
            return acc;
        }, {});


        const valuesArray = Object.values(reduced);
        console.log(valuesArray);

        const requireddata = valuesArray.map((val, ind) => {
            return val.reduce((acc, val, ind) => {
                acc.date = val.dt_txt
                acc.min = val.main.temp_min
                acc.max = val.main.temp_max
                acc.des = val.weather[0].description
                return acc
            }, {})
        })

        console.log(requireddata)
        setreducedarray(requireddata)

        console.log(reduced)
    }, [alldata]);


    const dateconverter = (dated) => {
        const date = new Date(dated);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate
    }


    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 gap-2 sidebar pt-4" style={{ width: "340px", height: "100%", color: "white" }}>
                <div className='d-flex flex-column align-items-center gap-1' style={{height:"100%"}}>
                    <img src={cloud} alt="" className='cloudImg' />
                    <h2>{requiredCity.name}</h2>
                    <h1>{(temperature - 273.15).toFixed(2)}&deg; C</h1>
                    <h3>{description}</h3>
                    {/* {console.log(presentweather)} */}
                    <table className="table table-borderless center-table">
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>|</td>
                                <td>{presentweather && presentweather.wind && presentweather.wind.speed ? `${presentweather.wind.speed} m/s` : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>|</td>
                                <td>{presentweather && presentweather.main && presentweather.main.humidity ? `${presentweather.main.humidity} %` : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th scope="col" colSpan={4} style={{ textAlign: "center" }}>Weather Forecast</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reducedarray.map((val, ind) => (
                                <tr key={ind}>
                                    <td>{dateconverter(val.date)}</td>
                                    <td>{(val.min- 273.15).toFixed(2)}&deg; C/ {(val.max - 273.15).toFixed(2)}&deg; C</td>
                                    <td>{val.des}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Sidebar