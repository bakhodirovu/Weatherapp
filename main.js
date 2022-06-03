const api ={
    key:'eab4ae2379656c952863985e890f4186',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
};
const searChBox = document.querySelector('.searchbox');
searChBox.addEventListener('keypress',setQuery)

function setQuery (e){
    if(e.keyCode == 13){
        getResults(searChBox.value)
        console.log(searChBox.value);
    } 
}

function getResults(query){
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) =>{
        return weather.json();
        })
        .then(displayResults);    
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .data');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp) }<span>°c</span>`;
    let weatheEl = document.querySelector('.weather');
    weatheEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low')
    hilow.innerHTML = `${Math.round(weather.main.temp_min) }°c /${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(s){
    let months = ['Janury', 'February','March','Appril','May','June','Jully','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednsday','Thursday','Friday','Saturday'];

    let day = days[s.getDay()];
    let date = s.getDate()
    let month =months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}