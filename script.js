


window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureCurrent = document.querySelector('.temperature-current');
    let morning = document.querySelector('.morning-degree');
    let afternoon = document.querySelector('.afternoon-degree');
    let evening = document.querySelector('.evening-degree');
    let night = document.querySelector('.night-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    // let belgorod = document.querySelector('.belgorod');
    // let rome = document.querySelector('.rome');
    // let city = belgorod.textContent;


    // rome.addEventListener('click', function () {
    //     city = rome.textContent;
    //     console.log(city);
    // });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let api;
            api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=ru&appid=ee9efec6c56ee11c9fb295a760e5aba6`;

            let geo = `https://open.mapquestapi.com/geocoding/v1/reverse?key=S9JzRzwJ3IevzgsLvU7etpaNxwyZoj3u&location=${lat},${long}`




            fetch(geo)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { adminArea5 } = data.results[0].locations[0];
                    locationTimezone.textContent = adminArea5;
                });


            fetch(api, {
                "method": "GET",

            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    morning.textContent = Math.round(data.hourly[0].temp);
                    afternoon.textContent = Math.round(data.hourly[6].temp);
                    evening.textContent = Math.round(data.hourly[12].temp);
                    night.textContent = Math.round(data.hourly[16].temp);
                    const { icon } = data.current.weather[0];
                    //Set DOM Elements from the API
                    temperatureCurrent.textContent = Math.round(data.current.temp);
                    temperatureDescription.textContent = data.current.weather[0].description;
                    wicon.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                })
        })
    }



})
