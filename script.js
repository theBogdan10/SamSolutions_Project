const appId='d4424ee2624d55b25cb2db519fe2123d';
const units='metric';
let searchMethod;


function getSearchMethod(searchTerm){
    if(searchTerm.lenght===5 && Number.parseInt(searchTerm)+''===searchTerm)
        searchMethod="zip"
    else
        searchMethod="q"    
}

let info= document.getElementById("first")
let div
let icon=document.getElementById("documentIconsImgs")
let imgg



function searchWeather(searchTerm){
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result =>{
            return result.json();
        
        })
        .then(result =>{
            let arr=result.list
            arr.forEach(function(e){
                div=document.createElement("div")
                imgg=document.createElement("img")
                if (e.dt_txt.indexOf('15:00')>0){
                   
                    div.innerHTML=("<b>"+getDayOfWeek(e.dt_txt)+"</b>"+"<br>"+e.weather[0].description+"<br>"+e.main.temp+" &#8451"+ "<hr>")
                    imgg.src='http://openweathermap.org/img/wn/'+e.weather[0].icon+'.png';

                    info.append(imgg) 
                    info.append(div)  
                }   
              
            })
                initBackground(result) 
                info.style.visibility="visible"    
                load(result)
                
                
                
        })//.catch(err=>console.error("Ooops! Try again"))

}


function initBackground(resultFromServer){
   switch (resultFromServer.list[0].weather[0].main) {
       case 'Clear':
            document.body.style.backgroundImage="url('img/clear2.jpg')"
           break;

        case 'Clouds':
             document.body.style.backgroundImage="url('img/cloud.jpg')"
           break;

        case 'Rain':  
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage="url('img/rain.jpg')"
           break; 
        case 'Thunderstorm':
                document.body.style.backgroundImage="url('img/stormy.jpg')"
        break; 

        case 'Snow':
                document.body.style.backgroundImage="url('img/snowy.jpg')"
                document.body.style.color="black"
        break;   
       default:

           break;
   }
}


   const weatherDescriptionHeader=document.getElementById("weatherDescriptionHeader");
   const temperatureElement=document.getElementById("temperature")
   const humidityElement=document.getElementById("humidity")
   const windSpeedElement=document.getElementById("windSpeed")
   const cityHeader=document.getElementById("cityHeader")
   const weatherIcon=document.getElementById("documentIconImg")
   const dateElement=document.getElementById("date")
   const dayOfWeek=document.getElementById("dayHeader")

   let itemsArr=[];

   
function load(resultFromServer){


   weatherIcon.src='http://openweathermap.org/img/wn/'+resultFromServer.list[0].weather[0].icon+'.png';

   let resultDescription=resultFromServer.list[0].weather[0].description;

   weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
   temperatureElement.innerHTML=Math.floor(resultFromServer.list[0].main.temp)+" &#8451";
   windSpeedElement.innerHTML="Winds at   "+ Math.floor(resultFromServer.list[0].wind.speed)+"m/s";
   cityHeader.innerHTML=resultFromServer.city.name;
   humidityElement.innerHTML="Humidity levels at   "+resultFromServer.list[0].main.humidity+"%"
   dayOfWeek.innerHTML=getDayOfWeek(new Date());
   
   let weatherContainer=document.getElementById("weatherContainer")
   weatherContainer.style.visibility="visible";
   
   
   itemsArr.push(resultFromServer.city.name)
   localStorage.setItem('cities', JSON.stringify(itemsArr))
}


document.getElementById("searchBtn").addEventListener("click",()=>{
    info.innerHTML="";
    let searchTerm=document.getElementById("searchInput").value;
    if(searchTerm){
        searchWeather(searchTerm)
    }
    
})


function getDayOfWeek(date){
    let day=new Date(date).getDay();
    switch (day){
        case 0:
            day="Sunday"
            break;
        case 1:
            day="Monday"
            break;
        case 2:
            day="Tuesday"
            break;
        case 3:
           day="Wednesday"
           break;
        case 4:
           day="Thursday"
           break;
        case 5:
           day="Friday"
           break;
        case 6:
           day="Saturday"
           break;                 
       default:
           break;
   }
   return day;
}


const form = document.getElementById('form');
let input= document.getElementById('searchInput')
input.value = localStorage.getItem(input.name)
form.onchange = e => localStorage.setItem(e.target.name, e.target.value);