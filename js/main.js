$(document).ready(function () {
    // console.log('Document ready Start');
    $('#searchLocation').click(function () {
        const city = encodeURIComponent($('#searchCity').val());
        let err = ``;
        let outPutHtml = ``;

        // if (city == '') {
        //     err = 'Please enter some location';

        // }

        // const country = $('#searchCountry').val();
        console.log(city);
        // console.log(country);
        if (city == '') {
            err = 'Please enter some location';
            outPutHtml += `<li class="list-group-item list-group-item-danger">${err}</li>`;
            console.log(outPutHtml);
            $('#search_result').html(outPutHtml);
            return;
        }
        const Obj = { city: city }
        localStorage.setItem("lastname", JSON.stringify(Obj));
        const url = `https://nominatim.openstreetmap.org/search.php?q=${city}&format=jsonv2`;
        const data = $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                outPutHtml = ``;
                if (data.length > 0) {
                    console.log('arr');
                    data.forEach(location => {
                        // console.log(location);
                        let lat = location.lat;
                        let long = location.lon;
                        let locationName = location.display_name;
                        // outPutHtml += `<option value="${locationName}">`
                        outPutHtml += `<li class="list-group-item list-group-item-info">${locationName}</li>`
                        console.log(lat, long, locationName);
                        console.log(outPutHtml);
                        // loadDailyWeatherCard(lat, long, locationName);

                    });
                    $('#search_result').html(outPutHtml);
                } else {
                    console.log('empty arr');
                    err = 'No location found';
                    outPutHtml += `<li class="list-group-item list-group-item-danger">${err}</li>`;
                    $('#search_result').html(outPutHtml);
                }


            }
        })

        // console.log(encodeCity);
    })

    // console.log('Document ready END');
})

// console.log('main Start');
function loadDailyWeatherCard(lat = 19.45, long = 72.79, location = 'Mumbai') {
    // console.log(lat, long, location);
    // const curl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&forecast_days=1&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,surface_pressure,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&models=best_match`;

    const data = $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',

        success: function (data) {
            // console.log(data);
            //temperature
            const x = $('#currentLocation');
            function getLocation() {
                if (navigator.geolocation) {
                    const local = navigator.geolocation.getCurrentPosition(showPosition, showError);
                    // console.log(local);
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }
            // getLocation();


            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
            }

            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        x.innerHTML = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.innerHTML = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        x.innerHTML = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        x.innerHTML = "An unknown error occurred."
                        break;
                }
            }


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
            $('#currentLocation').text(`Today Weather in ${location}`);
            $('#currentUpdatedAt').text('Updated ' + utcTimeInWord);
            $('#currentTemperature').text(temperature + ' ' + temperatureUnit);
            // $('#currentTime').text(istTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' }));
            $('#currentTime').text(istTime);
            $('#windSpeed').text(windSpeed + ' ' + windSpeedUnit);
            $('#humidity').text(relativeHumidity + ' ' + relativeHumidityUnit);
            $('#pressure').text(surfacePressure + ' ' + surfacePressureUnit);
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

function loadWeeklyWeatherChart() {

    const weeklyData = $.ajax({
        url: 'https://api.open-meteo.com/v1/forecast?latitude=19.45&longitude=72.79&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            const { time, temperature_2m_max, temperature_2m_min } = data.daily;

            const dataPoints = time.map((day, index) => {
                return {
                    date: moment(day).format('Do MMM YYYY'),
                    label: moment(day).format('dddd'),
                    y: [Math.round(temperature_2m_min[index]), Math.round(temperature_2m_max[index])],
                    name: "sunny"
                }
            })

            // console.log(dataPoints);

            var chart = new CanvasJS.Chart("weeklyWeatherChart", {
                title: {
                    text: "Weekly Weather Forecast"
                },
                axisY: {
                    suffix: " °C",
                    maximum: 40,
                    gridThickness: 0
                },
                toolTip: {
                    shared: true,
                    content: "{date} <br/> {name} </br> <strong>Temperature: </strong> </br> Min: {y[0]} °C, Max: {y[1]} °C"
                },
                data: [{
                    type: "rangeSplineArea",
                    fillOpacity: 0.1,
                    color: "#91AAB1",
                    indexLabelFormatter: formatter,
                    dataPoints: dataPoints
                    // dataPoints: [
                    //     { label: "Monday", y: [15, 26], name: "rainy" },
                    //     { label: "Tuesday", y: [15, 27], name: "rainy" },
                    //     { label: "Wednesday", y: [13, 27], name: "sunny" },
                    //     { label: "Thursday", y: [14, 27], name: "sunny" },
                    //     { label: "Friday", y: [15, 26], name: "cloudy" },
                    //     { label: "Saturday", y: [17, 26], name: "sunny" },
                    //     { label: "Sunday", y: [16, 27], name: "rainy" }
                    // ]
                }]
            });
            chart.render();

            var images = [];

            addImages(chart);

            function addImages(chart) {
                for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
                    var dpsName = chart.data[0].dataPoints[i].name;
                    if (dpsName == "cloudy") {
                        images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/cloudy.png"));

                        images.push($("<img>").attr("src", "https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009_640.png"));
                    } else if (dpsName == "rainy") {
                        images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/rainy.png"));

                        images.push($("<img>").attr("src", "https://cdn.pixabay.com/photo/2016/03/18/14/51/thunderstorm-1265161_960_720.png"));
                    } else if (dpsName == "sunny") {
                        images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/sunny.png"));

                        images.push($("<img>").attr("src", "https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157114_1280.png"));
                    }

                    images[i].attr("class", dpsName).appendTo($("#weeklyWeatherChart>.canvasjs-chart-container"));
                    positionImage(images[i], i);
                }
            }

            function positionImage(image, index) {
                var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
                var imageTop = chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum);

                image.width("40px")
                    .css({
                        "left": imageCenter - 20 + "px",
                        "position": "absolute", "top": imageTop + "px",
                        "position": "absolute"
                    });
            }

            $(window).resize(function () {
                var cloudyCounter = 0, rainyCounter = 0, sunnyCounter = 0;
                var imageCenter = 0;
                for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
                    imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
                    if (chart.data[0].dataPoints[i].name == "cloudy") {
                        $(".cloudy").eq(cloudyCounter++).css({ "left": imageCenter });
                    } else if (chart.data[0].dataPoints[i].name == "rainy") {
                        $(".rainy").eq(rainyCounter++).css({ "left": imageCenter });
                    } else if (chart.data[0].dataPoints[i].name == "sunny") {
                        $(".sunny").eq(sunnyCounter++).css({ "left": imageCenter });
                    }
                }
            });

            function formatter(e) {
                if (e.index === 0 && e.dataPoint.x === 0) {
                    return " Night " + e.dataPoint.y[e.index] + "°";
                } else if (e.index == 1 && e.dataPoint.x === 0) {
                    return " Day " + e.dataPoint.y[e.index] + "°";
                } else {
                    return e.dataPoint.y[e.index] + "°";
                }
            }
        }

    })
}

function getLocationApi(callback) {

    const url = 'https://nominatim.openstreetmap.org/search?city=virar&limit=1&format=json';

    const data = $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            let { lat, lon, name, display_name } = data[0];
            console.log(lat, lon, name, display_name);

            lat = Number(lat).toFixed(2);
            lon = Number(lon).toFixed(2);
            console.log(lat, lon);

            // If successful, execute the callback function with the latitude and longitude
            callback(lat, lon);

        }
    })
}

// Function to get longitude and latitude from location API
function getLocationCoordinates(city, country, callback) {
    // https://nominatim.openstreetmap.org/search?city=virar&country=india&limit=9&format=json
    const url = `https://nominatim.openstreetmap.org/search?city=virar&limit=5&format=json`;

    $.ajax({
        url: url,
        type: 'GET',
        data: { location: location },
        success: function (response) {
            console.log(response);
            // If successful, execute the callback function with the latitude and longitude
            // callback(response.latitude, response.longitude);
        },
        error: function (xhr, status, error) {
            console.error('Request failed: ' + status + ', ' + error);
        }
    });
}

// getLocationCoordinates(undefined, undefined, undefined);
// getLocationApi();

// console.log('main Start');