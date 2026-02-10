import drizzleSrc from '../assets/images/icon-drizzle.webp';
import fogSrc from '../assets/images/icon-fog.webp';
import overcastSrc from '../assets/images/icon-overcast.webp';
import partlyCloudySrc from '../assets/images/icon-partly-cloudy.webp';
import rainSrc from '../assets/images/icon-rain.webp';
import snowSrc from '../assets/images/icon-snow.webp';
import stormSrc from '../assets/images/icon-storm.webp';
import sunnySrc from '../assets/images/icon-sunny.webp';

export default class templateBuilder {
    constructor() {
        this.weatherTodayContainer = document.querySelector(".weather-today");
        this.feelslikeContainer = document.querySelector("#feels-like");
        this.humidityContainer = document.querySelector("#humidity");
        this.windContainer = document.querySelector("#wind");
        this.precipatationContainer = document.querySelector("#precipatation");
        this.dailyForecastContainers = document.querySelectorAll(".day__content");
        this.hourlyForecastContainer = document.querySelector(".hourly-weather__hours-container");
        this.icons = {
            'drizzle': drizzleSrc,
            'fog': fogSrc,
            'overcast': overcastSrc,
            'partly-cloudy': partlyCloudySrc,
            'rain': rainSrc,
            'snow': snowSrc,
            'storm': stormSrc,
            'sunny': sunnySrc
        }
    }
    fillData(data) {
        this.city = data.city;
        this.country = data.country;
        this.date = data.date;
        this.temperature = data.temperature;
        this.weather = data.weather;
        this.humidity = data.humidity;
        this.feelsLike = data['feels-like'];
        this.windSpeed = data['wind-speed'];
        this.precipatation = data.precipatation;
        this.weeklyWeather = data['weekly-weather'];
        this.hourlyForecast = data['hourly-forecast'];
    }
    fillPage() {
        this.constructWeatherToday();
        this.constructWeatherAdditional();
        this.constructDailyForecast();
        this.constructHourlyForecast();
        this.destroyLoading();
    }
    constructLoading() {
        const loadingTemplate = `
            <div class="loading">
                <div class="loading__container">
                <div>
                    <span class="loading__ball loading__ball_left"></span>
                    <span class="loading__ball loading__ball_middle"></span>
                    <span class="loading__ball loading__ball_right"></span>    
                </div>
                <span>Loading...</span>
                </div>        
            </div>
        `;
        this.weatherTodayContainer.classList.add('weather-today_loading');
        this.hourlyForecastContainer.classList.add('hourly-weather__hours-container_loading');
        this.weatherTodayContainer.innerHTML = loadingTemplate;
        this.hourlyForecastContainer.innerHTML = loadingTemplate;
    }
    destroyLoading() {
        this.weatherTodayContainer.classList.remove('weather-today_loading');
        this.hourlyForecastContainer.classList.remove('hourly-weather__hours-container_loading');
    }
    constructWeatherToday() {
        const template = `
            <div>
                <span class="weather-today__location">${this.city}, ${this.country}</span>
                <span class="weather-today__date">${this.date}</span>
            </div>
            <div class="weather-today__temperature-box">
                <div class="weather-today__icon">
                    <img src="${this.icons[this.weather]}" alt="${this.weather} icon">
                </div>
                <span class="weather-today__temperature" id="temperature">${this.temperature}&deg;C</span>
            </div>
        `;
        this.weatherTodayContainer.classList.remove('loading');
        this.weatherTodayContainer.innerHTML = template;
    }
    constructWeatherAdditional() {
        this.feelslikeContainer.innerHTML = `${this.feelsLike}`;
        this.humidityContainer.innerHTML = `${this.humidity}%`;
        this.windContainer.innerHTML = `${this.windSpeed} km/h`;
        this.precipatationContainer.innerHTML = `${this.precipatation} mm`;
    }
    constructDailyForecast() {
        this.weeklyWeather.forEach((day, ind) => {
            const template = `
                <img src="${this.icons[day.weather]}" class="day__weather-icon" alt="${day.weather} icon">
                <div class="day__temperatures">
                    <span class="day__temperature-day">${day.temperatures[0]}&deg;</span>
                    <span class="day__temperature-evening">${day.temperatures[1]}&deg;</span>
                </div>
            `;
            this.dailyForecastContainers[ind].innerHTML = template;
        });
    }
    constructHourlyForecast() {
        const ol = document.createElement('ol');
        ol.classList.add('hourly-weather__hours-list');
        this.hourlyForecast.forEach((el, ind) => {
            const li = document.createElement('li');
            li.classList.add("weather-current-hour", "hourly-weather__hours-item");
            const template = `
                <img src="${this.icons[el.weather]}" alt="${el.weather} icon" class="weather-current-hour__icon">
                <span class="weather-current-hour__time">${ind} ${ind < 12 ? 'AM' : 'PM'}</span>
                <span class="weather-current-hour__temperature">${el.temperature}&deg;</span>
            `;
            li.innerHTML = template;
            ol.append(li);
        })
        this.hourlyForecastContainer.querySelector('.loading').replaceWith(ol);
    }
}