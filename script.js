
let appId='d4424ee2624d55b25cb2db519fe2123d';
let units='metric';
let searchMethod;


function getSearchMethod(searchTerm){
    if(searchTerm.lenght===5 && Number.parseInt(searchTerm)+''===searchTerm)
        searchMethod="zip"
    else
        searchMethod="q"    
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result =>{
        init(result)
    })

}


function init(resultFromServer){
   switch (resultFromServer.weather[0].main) {
       case 'Clear':
            document.body.style.backgroundImage="url('img/clear.jpg')"
           break;

        case 'Clouds':
             document.body.style.backgroundImage="url('img/cloud.jpg')"
           break;

        case 'Rain':  
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage="url('img/rainy.jpg')"
           break; 
        case 'Thunderstorm':
                document.body.style.backgroundImage="url('img/stormy.jpg')"
        break; 

        case 'Snow':
                document.body.style.backgroundImage="url('img/snowy.jpg')"
        break;   
       default:

           break;
   }

   let weatherDescriptionHeader=document.getElementById("weatherDescriptionHeader");
   let temperatureElement=document.getElementById("temperature")
   let humidityElement=document.getElementById("humidity")
   let windSpeedElement=document.getElementById("windSpeed")
   let cityHeader=document.getElementById("cityHeader")
   let weatherIcon=document.getElementById("documentIconImg")

   weatherIcon.src='http://openweathermap.org/img/wn/'+resultFromServer.weather[0].icon+'.png';

   let resultDescription=resultFromServer.weather[0].description;

   weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
   temperatureElement.innerHTML=Math.floor(resultFromServer.main.temp)+" &#8451";
   windSpeedElement.innerHTML="Winds at  "+ Math.floor(resultFromServer.wind.speed)+"m/s";
   cityHeader.innerHTML=resultFromServer.name;
   humidityElement.innerHTML="Humidity levels at  "+resultFromServer.main.humidity+"%"

   setPositionForWeatherInfo()

}



function setPositionForWeatherInfo(){
    let weatherContainer=document.getElementById("weatherContainer")
    let weatherContainerHeight=weatherContainer.clientHeight;
    let weatherContainerWidth=weatherContainer.clientWidth;

    
    weatherContainer.style.visibility="visible";
}
 

document.getElementById("searchBtn").addEventListener("click",()=>{
    let searchTerm=document.getElementById("searchInput").value;
    if(searchTerm){
        searchWeather(searchTerm)
    }
})




document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.button'),
        loader = document.querySelector('.loader'),
        check = document.querySelector('.check');
    
    btn.addEventListener('click', function () {
      loader.classList.add('active');    
    });
   
    loader.addEventListener('animationend', function() {
      check.classList.add('active'); 
    });
  });
  