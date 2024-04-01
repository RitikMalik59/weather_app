$(document).ready(function () {
    // console.log('Document ready Start');

    

    // console.log('Document ready END');
})

// console.log('main Start');
function loadDailyWeatherCard() {
    // console.log('loadDailyWeatherCard');
    const curl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=19.45&longitude=72.79&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,surface_pressure,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&models=best_match';
    const data = $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',

        success: function (data) {
            console.log(data);
            //temperature
            const temperature = Math.round(data.current.temperature_2m);
            const temperatureUnit = data.current_units.temperature_2m;
            //time
            const time = data.current.time;
            const utcTime = moment.utc(time);
            const utcTimeInWord = utcTime.fromNow();
            const istTime = moment().format('LT');
            //weather property
            const windSpeed = data.current.wind_speed_10m;
            const windSpeedUnit = data.current_units.wind_speed_10m;
            const relativeHumidity = data.current.relative_humidity_2m;
            const relativeHumidityUnit = data.current_units.relative_humidity_2m;
            const surfacePressure = data.current.surface_pressure;
            const surfacePressureUnit = data.current_units.surface_pressure;
            // console.log(windSpeed, windSpeedUnit);


            //Changing daily_weather card elment 
            $('#currentUpdatedAt').text('Updated ' + utcTimeInWord);
            $('#currentTemperature').text(temperature + ' ' + temperatureUnit);
            // $('#currentTime').text(istTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' }));
            $('#currentTime').text(istTime);
            $('#windSpeed').text(windSpeed + ' ' + windSpeedUnit);
            $('#humidity').text(relativeHumidity + ' ' + relativeHumidityUnit);
            $('#pressure').text(surfacePressure + ' ' + surfacePressureUnit);


            // console.log('daily_weather'); 


        }
    })
}



// console.log('main Start');