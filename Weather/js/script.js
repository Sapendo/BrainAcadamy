"use strict";

var city, lang, period;
var weatherRequest = new XMLHttpRequest();
var weatherData;

//$.noConflict();
$(document).ready(function() {
    var $form = $('form');
    $form.submit(function(e) {
        e.preventDefault();
        city = $('#city').val();
        period = $('#period').val();
        if (period === '0') {
            weatherRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?APPID=18adba29836aa192ef14da5c44c7e1ab&q=' + city + '&units=metric');
        } else {
            weatherRequest.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=18adba29836aa192ef14da5c44c7e1ab&q=' + city + '&units=metric&cnt=' + period);
        }
        weatherRequest.send();
    });
});
weatherRequest.onload = function() {
    if (this.readyState !== 4) {
        return;
    }
    if (this.status !== 200) {
        console.log(this.status + " " + this.statusText);
    }
    try {
        weatherData = JSON.parse(this.responseText);
    } catch (e) {
        console.log('JSON поврежден! Ошибка: ' + e.message);
    }
    $('#weatherInfo').html('');
    var weatherInfoCurrent = '';
    if (period === '0') {
        weatherInfoCurrent += '<div class="wrap"><table>';
        weatherInfoCurrent += '<tr class="headTable"><td>' + weatherData.name + ', ' + weatherData.sys.country + '<br>' + weatherData.main.temp + ' &deg;C</td><td class="secondCol"><img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png" alt=""></td></tr><tbody class="tbody"><tr><td>Max tempeture</td><td class="secondCol">' + weatherData.main.temp_max + ' &deg;C</td></tr><tr><td>Min tempeture</td><td class="secondCol">' + weatherData.main.temp_min + ' &deg;C</td></tr><tr><td>Pressure</td><td class="secondCol">' + weatherData.main.pressure + ' hpa</td></tr><tr><td>Cloudly</td><td class="secondCol">' + weatherData.clouds.all + '%</td></tr><tr><td>Humidity</td><td class="secondCol">' + weatherData.main.humidity + '%</td></tr><tr><td>Wind</td><td class="secondCol">' + weatherData.wind.speed + ' m/s</td></tr>';
        weatherInfoCurrent += '</tbody></table></div>';
    } else {
        for (var i = 0; i < weatherData.list.length; i++) {
            weatherInfoCurrent += '<div class="wrap"><table>';
            weatherInfoCurrent += '<tr class="headTable"><td>' + weatherData.city.name + ', ' + weatherData.city.country + '<br>' + weatherData.list[i].temp.day + ' &deg;C</td><td class="secondCol"><img src="http://openweathermap.org/img/w/' + weatherData.list[i].weather[0].icon + '.png" alt=""></td></tr><tbody class="tbody"><tr><td>Max tempeture</td><td class="secondCol">' + weatherData.list[i].temp.max + ' &deg;C</td></tr><tr><td>Min tempeture</td><td class="secondCol">' + weatherData.list[i].temp.min + ' &deg;C</td></tr><tr><td>Pressure</td><td class="secondCol">' + weatherData.list[i].pressure + ' hpa</td></tr><tr><td>Cloudly</td><td class="secondCol">' + weatherData.list[i].clouds + '%</td></tr><tr><td>Humidity</td><td class="secondCol">' + weatherData.list[i].humidity + '%</td></tr><tr><td>Wind</td><td class="secondCol">' + weatherData.list[i].speed + ' m/s</td></tr>';
            weatherInfoCurrent += '</tbody></table></div>';
        }
    }
    $('#weatherInfo').html(weatherInfoCurrent);
    $('.tbody>tr:even').css('background-color','#ccc');
    console.log('weatherData', weatherData);
};