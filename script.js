document.addEventListener('DOMContentLoaded',()=>{

    console.log("JS is working");
    
    const city_input = document.getElementById('city-input');
    const get_weather_btn = document.getElementById('get-weather-btn');
    const weather_info = document.getElementById('weather-info');

    const city_name_display = document.getElementById('city-name')
    const temp_display = document.getElementById('temperature')
    const description_display = document.getElementById('description')
    const error_msg = document.getElementById('error-message')
    
    const API_KEY = "086573b145de709bc07cd17f9f47a4bc"
    let api_url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
   

    //on click the btn garb the input
    get_weather_btn.addEventListener('click',async()=>{
        
        city_name_display.textContent = '';
        temp_display.textContent = '';
        description_display.textContent = '';
        //grab city name
        const city_name = city_input.value.trim()
        if(!city_name) return;
        //fetch weather data of the city
        //server may throw the error so bind the api request in try cacth block
        try {
            const  weatherData = await fetch_weatherData(city_name);//await need to access the async function
            display_weatherData(weatherData)
            
        } catch (error) {
            console.log("error from get_weather_btn",error);
            showError()
            
            
            
        }



    });
    //must be a async function 
    async function fetch_weatherData(city){
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        try{
            const response = await fetch(url)
            
            if(response.ok != true){
                throw new Error(`response status`)
            }
            console.log("Type of response",typeof(response));
            console.log(response);
            const data = await response.json();
           // console.log(data);
            return data;
    
        }catch(err){
            console.log("ERROR !!",err);
            throw err
            
        }

    }

    function display_weatherData(city){
        console.log("Displaying the data from display_weatherData function ",city);
        
       
        const {name,main,weather} = city;
        weather_info.classList.remove('hidden');
        weather_info.classList.add('show');
        error_msg.classList.add('hidden');

        
        city_name_display.textContent = name;
        temp_display.textContent = `Temperature ${(main.temp / 10).toFixed(1)}°C, Feels like ${(main.feels_like/10).toFixed(1)}°C`;
        description_display.textContent = `Humidity ${main.humidity}%, Weather: ${weather[0].description}`;
        console.log("end");
        
        
                
    
        
    }
    function showError(){
        weather_info.classList.add('hidden')
        error_msg.classList.remove('hidden')


    }

















})