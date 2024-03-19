import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container } from 'react-bootstrap';
import './Chart.css'

function Chart({ timefilter }) {

    let requiredtimedataforarray = [];
    if (timefilter && timefilter.length > 0) {
        requiredtimedataforarray = timefilter.map(item => {
            const date = new Date(item.dt_txt);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1} - ${formatAMPM(date)}`;
            return formattedDate;
        });
    }

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ampm;
        return strTime;
    }


    const tempdata = timefilter.map((item) => {
        let celsius = (item.main.temp - 273.15).toFixed(2);
        return celsius;
    });

    const data = {
        labels: requiredtimedataforarray.slice(0, 8),
        datasets: [
            {
                label: 'Hourly Forecast',
                backgroundColor: 'rgb(69,87,127)',
                borderColor: 'rgba(129, 12, 168,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(193, 71, 233,0.8)',
                hoverBorderColor: 'rgba(129, 12, 168,1)',
                data: tempdata.slice(0, 10), // You may replace this with actual weather data
            },
        ],
    };

    return (
        <>
            <Container className="col-xxl-8 skill-chart-cont ">
                <h4 className='fw-bold pb-1 justify-content-center d-flex chart'>Hourly Forecast</h4>
                <div className='justify-content-center d-flex'>
                <Line data={data} className='charts ' />
                </div>
                {/* {console.log(timefilter)} */}
            </Container>
        </>
    );
}

export default Chart;
