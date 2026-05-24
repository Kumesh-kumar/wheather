// weather input data
const wheather_search_form = document.querySelector(".wheather_search");
const wheather_input = document.querySelector(".wheather_input");
const wheather_btn = document.querySelector(".wheather_btn");

// main data in weather
const wheather_city = document.querySelector(".wheather_city");
const wheather_date_time = document.querySelector(".wheather_date_time");
const wheather_forecast = document.querySelector(".wheather_forecast");
const wheather_icon = document.querySelector(".wheather_icon");
const wheather_temp = document.querySelector(".wheather_temp");
const wheather_min = document.querySelector(".wheather_min");
const wheather_max = document.querySelector(".wheather_max");

// weather extra data
const wheather_feelsLike = document.querySelector(".wheather_feels_like");
const wheather_humidity = document.querySelector(".wheather_humidity");
const wheather_wind = document.querySelector(".wheather_wind");
const wheather_pressure = document.querySelector(".wheather_pressure");

const card_detail = document.querySelectorAll(".card_detail");

const API_KEY = "2e4c6c53fb601aa8f62ed73626245f51";

let city = "mohali";

// ===============================
// SEARCH WEATHER BY CITY
// ===============================

wheather_search_form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputValue = wheather_input.value.trim();

    if (!inputValue) return;

    await getWheatherData(inputValue);

    wheather_input.value = "";

});

// ===============================
// GET USER CURRENT LOCATION
// ===============================

wheather_btn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const api_url =
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

                try {

                    const response = await fetch(api_url);
                    const data = await response.json();

                    console.log("Current Location Weather:", data);

                    updateWeatherUI(data);

                } catch (error) {

                    console.log("API is not working", error);

                }

            },
            (error) => {

                console.log("Location Error:", error);

                alert("Unable to get your location.");

            }
        );

    } else {

        alert("Geolocation is not supported by this browser.");

    }

});

// ===============================
// COUNTRY NAME
// ===============================

const getCountryData = (code) => {
    return new Intl.DisplayNames(["en"], {
        type: "region",
    }).of(code);
};

// ===============================
// DATE & TIME FORMAT
// ===============================

const getDateTimeFormat = (date) => {

    const curDate = new Date(date * 1000);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

// ===============================
// GET WEATHER DATA
// ===============================

const getWheatherData = async (cityName) => {

    const api_url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(api_url);
        const data = await response.json();

        console.log("Weather Data:", data);

        // city not found
        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        updateWeatherUI(data);

    } catch (error) {

        console.log("API is not working", error);

    }

};

// ===============================
// UPDATE UI
// ===============================

const updateWeatherUI = (data) => {

    // card headings
    card_detail[0].children[0].innerText = "Feels Like";
    card_detail[1].children[0].innerText = "Humidity";
    card_detail[2].children[0].innerText = "Wind";
    card_detail[3].children[0].innerText = "Pressure";

    // city name
    wheather_city.innerText =
        `${data.name}, ${getCountryData(data.sys.country)}`;

    // date and time
    wheather_date_time.innerText =
        `${getDateTimeFormat(data.dt)}`;

    // forecast
    wheather_forecast.innerText =
        `${data.weather[0].main}`;

    // icon
    wheather_icon.innerHTML =
        `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="image_adjust"/>`;

    // temperature
    wheather_temp.innerHTML =
        `${Math.round(data.main.temp)}&#176C`;

    wheather_temp.style.fontSize = "1.5rem";

    // min max temp
    wheather_min.innerHTML =
        `Min: ${Math.round(data.main.temp_min)}&#176C`;

    wheather_max.innerHTML =
        `Max: ${Math.round(data.main.temp_max)}&#176C`;

    // extra details
    wheather_feelsLike.innerHTML =
        `${Math.round(data.main.feels_like)}&#176C`;

    wheather_humidity.innerText =
        `${data.main.humidity}%`;

    wheather_wind.innerText =
        `${data.wind.speed} m/s`;

    wheather_pressure.innerText =
        `${data.main.pressure} hPa`;

};

// ===============================
// DEFAULT WEATHER ON PAGE LOAD
// ===============================

window.addEventListener("load", () => {
    getWheatherData(city);
});