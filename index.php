<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weather App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <script src="js/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.canvasjs.com/jquery.canvasjs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body class="bg-secondary-subtle">

    <div class="container-fluid justify-content-center pb-4">
        <h1 class="display-6 text-center pt-4">Weather App</h1>
        <div class="row justify-content-center mt-5 mx-1">
            <div class="col-md-7">
                <div class="Search pb-3">
                    <h2 class="display-5">Search location</h2>
                    <div class="row input-group g-3">
                        <div class="col-md-7 col-sm-9">
                            <input type="text" list="search_results" class="form-control" id="searchCity" placeholder="Enter Your City Name">
                            <!-- <div class="z-2 position-absolute m-2 rounded-5 bg-dark-subtle">
                                <ul class="list-group bg-info-subtle" id="search_result"></ul>
                            </div> -->
                        </div>
                        <div class="col-md-2 col-sm-2 ">
                            <input type="button" class="form-control btn btn-primary " id="searchLocation" value="Search">
                        </div>

                    </div>
                    <div class="z-2 position-absolute m-2 rounded-5 bg-dark-subtle">
                        <ul class="list-group bg-info-subtle" id="search_result"></ul>
                    </div>
                </div>

                <div class="card" id="daily_weather">

                    <div class="card-body">
                        <p class="card-title" id="currentUpdatedAt">Updated 5 minutes ago</p>
                        <div class="card-title d-flex justify-content-between">
                            <h5 class="card-text" id="currentLocation">Today Weather in Virar, Maharashtra, India</h5>
                            <h5 class="card-text" id="currentTime">9:00 PM</h5>
                        </div>

                        <div class="row pt-2 ">
                            <div class="col">
                                <h2 class="display-3 px-4" id="currentTemperature"> 34° C</h2>
                            </div>
                            <div class="col-md">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span><i class="bi bi-wind"></i> Wind</span>
                                        <span id="windSpeed">34 km/m ~</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span><i class="bi bi-moisture"></i> Humidity</span>
                                        <span id="humidity">51%</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span><i class="bi bi-thermometer-high"></i> Pressure</span>
                                        <span id="pressure">29.85 in</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="weeklyWeatherChart" class="pt-4" style="height: 300px; width: 100%; position: relative;"></div>
            </div>
        </div>
    </div>

    <div class="container footer-space py-4">

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="js/main.js"></script>
    <script>
        $(document).ready(function() {
            loadDailyWeatherCard();
            loadWeeklyWeatherChart();

        });
    </script>
</body>

</html>