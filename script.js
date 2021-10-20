window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let belgorod = document.querySelector('.belgorod');
    let rome = document.querySelector('.rome');
    let city = belgorod.textContent;


    rome.addEventListener('click', function () {
        city = rome.textContent;
        console.log(city);
    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let api;
            api = `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&lat=${lat}&lon=${long}&lang=null&units=metric`

            fetch(api, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": "35d88a033cmsh92ee3ea148f7562p13aa39jsnf6a332875aa9"
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp, feels } = data.main;
                    const { name } = data;
                    const { icon } = data.weather[0].icon;
                    const { main } = data.weather[0].main;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                    locationTimezone.textContent = name;
                    temperatureDescription.textContent = data.weather[0].description;
                    setIcons(icon, document.querySelector('.icon'))
                })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        let currentIcon;
        if (temperatureDescription.textContent === "overcast clouds") {
            currentIcon = Skycons.CLOUDY;
        } else if (temperatureDescription.textContent === "light rain") {
            currentIcon = Skycons.RAIN;
        } else if (temperatureDescription.textContent === "clear sky") {
            currentIcon = Skycons.CLEAR_DAY;
        } else if (temperatureDescription.textContent === "broken clouds") {
            currentIcon = Skycons.PARTLY_CLOUDY_DAY;

        } else if (temperatureDescription.textContent === "fog") {
            currentIcon = Skycons.FOG;
        }

        skycons.play();
        return skycons.set(iconID, currentIcon);
    }


})