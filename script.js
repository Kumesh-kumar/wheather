



// wheather input data 
const wheather_search_form = document.querySelector(".wheather_search");
const wheather_input = document.querySelector(".wheather_input")

// main data in wheather 
const wheather_city = document.querySelector('.wheather_city');
const wheather_date_time = document.querySelector(".wheather_date_time");
const wheather_forecast = document.querySelector(".wheather_forecast");
const wheather_icon = document.querySelector(".wheather_icon");
const wheather_temp = document.querySelector(".wheather_temp");
const wheather_min = document.querySelector(".wheather_min");
const wheather_max = document.querySelector(".wheather_max")

// wheather_extra_data 
const wheather_feelsLike = document.querySelector(".wheather_feels_like");
const wheather_humidity = document.querySelector(".wheather_humidity")
const wheather_wind = document.querySelector(".wheather_wind")
const wheather_pressure = document.querySelector(".wheather_pressure")
const card_detail = document.querySelectorAll('.card_detail')

let city = "mohali"


wheather_search_form.addEventListener('submit', (e) => {
    e.preventDefault()
    city = wheather_input.value
    getWheatherData()
    wheather_input.value = ""
})
const getCountryData = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code)
}
const getDateTimeFormat = (date) => {
    const curDate = new Date(date * 1000); // convert seconds to milliseconds

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",


    }

    return new Intl.DateTimeFormat('en-US', options).format(curDate)
}
const getWheatherData = async () => {

    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2e4c6c53fb601aa8f62ed73626245f51`
    try {
        const response = await fetch(api_url)
        const data = await response.json()
        console.log("wheather data", data)


        card_detail[0].children[0].innerText = "Feels like";
        card_detail[1].children[0].innerText = "Humidity";
        card_detail[2].children[0].innerText = "Wind";
        card_detail[3].children[0].innerText = "Pressure";

        wheather_city.innerText = `${data.name}, ${getCountryData(data.sys.country)}`
        wheather_date_time.innerText = `${getDateTimeFormat(data.dt)}`

        wheather_forecast.innerText = `${data.weather[0].main}`
        wheather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="image_adjust"/>`;
        wheather_temp.innerHTML = `${data.main.temp}&#176`
        wheather_temp.style.fontSize = "1.5rem"
        wheather_min.innerHTML = `Min: ${data.main.temp_min}&#176`
        wheather_max.innerHTML = `Max: ${data.main.temp_max}&#176`

        wheather_feelsLike.innerHTML = `${data.main.feels_like}&#176`;
        wheather_humidity.innerText = `${data.main.humidity} %`
        wheather_wind.innerText = `${data.wind.speed} m/s`
        wheather_pressure.innerText = `${data.main.pressure} hPa`
    } catch (error) {
        console.log("Api is not working", error)
    }




}

document.body.addEventListener("load", getWheatherData())