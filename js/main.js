var UsersDB = [];
var MO10Loggedin = "";
UsersDB = JSON.parse(localStorage.getItem('UsersDB'));
MO10Loggedin = JSON.parse(localStorage.getItem('MO10Loggedin'));

if (UsersDB == null)
    UsersDB = [];
const APIKEY='83f8d1355e2b4db2aad162016230603';
let navlink = document.querySelectorAll('.nav-link');
let searchwheather = document.querySelector('#searchwheather');
let searchbtn = document.querySelector('#searchbtn');
let rainmo = document.querySelector('.rainmo');
let sunnymo = document.querySelector('.sunnymo');

let currentlocationname = document.querySelector('#currentlocationname');

let currentweather = document.querySelector('#currentweather');
let currentdate = document.querySelector('#currentdate');
let currentdayname = document.querySelector('#currentdayname');
let currenttime = document.querySelector('#currenttime');
let currentweathertext = document.querySelector('#currentweathertext');
let currentweatherico = document.querySelector('#currentweatherico');
let currenttempc = document.querySelector('#currenttempc');
let currentmaxmintempc = document.querySelector('#currentmaxmintempc');
let currenthumidity = document.querySelector('#currenthumidity');
let currentwind_kph = document.querySelector('#currentwind_kph');
let currentchancerain = document.querySelector('#currentchancerain');

let next1locationname = document.querySelector('#next1locationname');
let next1weather = document.querySelector('#next1weather');
let next1date = document.querySelector('#next1date');
let next1dayname = document.querySelector('#next1dayname');
let next1time = document.querySelector('#next1time');
let next1weathertext = document.querySelector('#next1weathertext');
let next1weatherico = document.querySelector('#next1weatherico');
let next1tempc = document.querySelector('#next1tempc');
let next1maxmintempc = document.querySelector('#next1maxmintempc');
let next1humidity = document.querySelector('#next1humidity');
let next1wind_kph = document.querySelector('#next1wind_kph');
let next1chancerain = document.querySelector('#next1chancerain');


let next2locationname = document.querySelector('#next2locationname');
let next2weather = document.querySelector('#next2weather');
let next2date = document.querySelector('#next2date');
let next2dayname = document.querySelector('#next2dayname');
let next2time = document.querySelector('#next2time');
let next2weathertext = document.querySelector('#next2weathertext');
let next2weatherico = document.querySelector('#next2weatherico');
let next2tempc = document.querySelector('#next2tempc');
let next2maxmintempc = document.querySelector('#next2maxmintempc');
let next2humidity = document.querySelector('#next2humidity');
let next2wind_kph = document.querySelector('#next2wind_kph');
let next2chancerain = document.querySelector('#next2chancerain');

let smforecast = document.querySelector('#smforecast');

let data = {};
let forecast = [];
let request = (async (locname) => {

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${locname}&days=8`,
        {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    data = await response.text();

    let hasss = JSON.parse(data);
    forecast = [...hasss.forecast.forecastday];

    currentweatherico.setAttribute('src', hasss.current.condition.icon);
    currentdate.innerHTML = dayMonth(hasss.current.last_updated);
    currentdayname.innerHTML = "Today";
    currenttime.innerHTML = "LastUpdate[" + whatstime(hasss.current.last_updated) + "]";
    currentlocationname.innerHTML = hasss.location.name;
    currentweathertext.innerHTML = hasss.current.condition.text;
    let currenttemp = `<h6>${forecast[0].day.maxtemp_c}<sup>o</sup><span>C</span></h6>` + `<p>${forecast[0].day.mintemp_c}<sup>o</sup><span>C</span></p>`;
    currentmaxmintempc.innerHTML = currenttemp;
    currenttempc.innerHTML = `<h3>${hasss.current.temp_c}<sup>o</sup><span>C</span></h3>`;
    currenthumidity.innerHTML = forecast[0].day.avghumidity;
    currentwind_kph.innerHTML = forecast[0].day.maxwind_kph + "";
    currentchancerain.innerHTML = forecast[0].day.daily_chance_of_rain + "%";
    
    if (forecast[0].day.daily_chance_of_rain > 50)
        rainmo.style.display = "block";
    else
        rainmo.style.display = "none";
    if (currentweathertext.textContent == "Sunny")
        sunnymo.style.display = "block";
    else
        sunnymo.style.display = "none";
    next1weatherico.setAttribute('src', forecast[1].day.condition.icon);
    next1date.innerHTML = dayMonth(forecast[1].date);
    next1dayname.innerHTML = dayName(forecast[1].date);
    next1locationname.innerHTML = hasss.location.name;
    next1weathertext.innerHTML = forecast[1].day.condition.text;
    let next1temp = `<h6>${forecast[1].day.maxtemp_c}<sup>o</sup><span>C</span></h6>` + `<p>${forecast[1].day.mintemp_c}<sup>o</sup><span>C</span></p>`;
    next1maxmintempc.innerHTML = next1temp;
    next1tempc.innerHTML = `<h3>${forecast[1].day.avgtemp_c}<sup>o</sup><span>C</span></h3>`;
    next1humidity.innerHTML = forecast[1].day.avghumidity;
    next1wind_kph.innerHTML = forecast[1].day.maxwind_kph + "";
    next1chancerain.innerHTML = forecast[1].day.daily_chance_of_rain + "%";

    next2weatherico.setAttribute('src', forecast[2].day.condition.icon);
    next2date.innerHTML = dayMonth(forecast[2].date);
    next2dayname.innerHTML = dayName(forecast[2].date);
    next2locationname.innerHTML = hasss.location.name;
    next2weathertext.innerHTML = forecast[2].day.condition.text;
    let next2temp = `<h6>${forecast[2].day.maxtemp_c}<sup>o</sup><span>C</span></h6>` + `<p>${forecast[2].day.mintemp_c}<sup>o</sup><span>C</span></p>`;
    next2maxmintempc.innerHTML = next2temp;
    next2tempc.innerHTML = `<h3>${forecast[2].day.avgtemp_c}<sup>o</sup><span>C</span></h3>`;
    next2humidity.innerHTML = forecast[2].day.avghumidity;
    next2wind_kph.innerHTML = forecast[2].day.maxwind_kph + "";
    next2chancerain.innerHTML = forecast[2].day.daily_chance_of_rain + "%";

    let cartona = "";
    for (let i = 3; i < forecast.length; i++) {
        cartona += `
                    <div class="rounded col-md-2 bg-primary bg-opacity-10 m-1">
                    <div class="row bg-primary bg-opacity-10">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <p id="currentdate" class="bg-transparent text-center  text-light text-bg-primary m-0">${dayName(forecast[i].date)}</p>
                    </div>
                    </div>
                    <div class="m-auto row ">
                    <div class="m-auto col-sm-12 col-md-12 col-lg-6">
                    <div class="m-auto w-100">
                    <div class="text-light"><span>${forecast[i].day.condition.text}</span></div>
                        <img class="logoicon" src="${forecast[i].day.condition.icon}" alt="">
                    </div>
                    </div>
                    <div class="m-auto  col-sm-12 col-md-12 col-lg-6">
                    <div class="w-100">
                    <h6 class="text-light">${forecast[i].day.maxtemp_c}<sup>o</sup><span>C</span></h6>
                    <p class="text-light">${forecast[i].day.mintemp_c}<sup>o</sup><span>C</span></p>
                    </div>
                    </div>
                    </div>
                    </div>`;
    }
    smforecast.innerHTML = cartona;
}
);
document.addEventListener('keyup', (e) => {
    if (e.key == "F4") {
        request(searchwheather.value);

    }
});
searchbtn.addEventListener('click', () => {
    request(searchwheather.value);
});
for (var i = 0; i < navlink.length; i++) {
    navlink[i].addEventListener('click', (event) => {
        request(event.target.text);
    });
}
let dayName = (date) => {
    let dateaa = new Date(date);
    let dayaaa = dateaa.toLocaleString('en-us', { weekday: 'long' });
    return dayaaa;
};
let dayMonth = (date) => {
    let dateaa = new Date(date);
    let dayaaa = (dateaa.toLocaleString("en-us", { day: "numeric" }) + " " + dateaa.toLocaleString('en-us', { month: 'long' }));
    return dayaaa;
};
let whatstime = (date) => {
    let timea = new Date(date);
    let whatstimeaa = timea.getHours() + ':' + timea.getMinutes();
    return whatstimeaa;
};
request("Cairo");