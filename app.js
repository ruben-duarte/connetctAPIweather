const apikey = "c5a3fe896343ec16b8ed4675b33315f3";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response failed");
        }

        const data  = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Sensación térmica: ${Math.round(data.main.feels_like)}`,
            `Humedad: ${data.main.humidity} %`,
            `Velocidad del viento: ${data.wind.speed} m/s`
        ]

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon" >`;

        weatherDataElement.querySelector(".temperature").textContent = `${temperature} `;
        weatherDataElement.querySelector(".description").textContent = description;
        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => `<div> ${detail} </div>`).join("");

    } catch (error) {
        weatherDataElement.querySelector(".icon").innerHTML = "";

        weatherDataElement.querySelector(".temperature").textContent = "";
        weatherDataElement.querySelector(".description").textContent = "Ocurrió un error, intente de nuevo por favor";
        weatherDataElement.querySelector(".details").innerHTML = "";
}
}