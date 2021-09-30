const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = 'd247f4e74ef95cf541c3bb882d1fa708';
const d = document;
let info = d.getElementById('info');
let buscar = d.getElementById('buscar');
let input = d.getElementById('input');

buscar.addEventListener('click', (e) => {
    e.preventDefault();
    if(input.value != ''){
        obtenerDato(input.value);   
    }
})

function obtenerDato(valor){
fetch(url + valor + '&appid='+ API_KEY + '&units=metric&lang=es')
    .then(response => response.json() )     
    .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const celsiusMin = data.main.temp_min;
        const celsiusMax = data.main.temp_max ;
        const celsiusSens = data.main.feels_like;
        const temperaturaMin = celsiusMin.toFixed(1);
        const temperaturaMax = celsiusMax.toFixed(1);
        const temperaturaSens = celsiusSens.toFixed(1);
        const humedad = data.main.humidity;
        const presion = data.main.pressure;
        const vientoKm = data.wind.speed * 3.6;
        const viento = vientoKm.toFixed(0);
        const cieloIcono = data.weather.map(function(icono){
            return icono.icon;
        })
        const cielo = data.weather.map(function(descripcion){
            return descripcion.description[0].toUpperCase() + descripcion.description.slice(1);
        })

        //API Google Maps
            let coord = {lat: lat ,lng: lon};
            let map = new google.maps.Map(d.getElementById('map'), {
                zoom: 12,
                center: coord
            });
            var marker = new google.maps.Marker({
                position: coord,
                map: map
            });
        //-----

        info.innerHTML = `<div class="row d-sm-none">
                            <div class="col-12 pb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h2 class="text-center">${data.name}</h2>
                                            <div class="row">
                                                <div class="col-4 col-md-5"></div>
                                                    <div class="col-4 col-md-2">
                                                        <img class="card-img-top" src="http://openweathermap.org/img/wn/${cieloIcono}@2x.png" alt="${cielo}" />
                                                    </div>
                                                <div class="col-4 col-md-5"></div>
                                            </div>
                                            <h3 class="text-center" id="feels_like">${temperaturaSens}°C</h3>
                                            <h4 class="text-center mb-3" id="trad">${cielo}</h4>
                                                <ul class="list-group">
                                                    <li class="list-group-item text-center">
                                                        <p>Temperatura</p>
                                                        <span class="text-danger"><strong>${temperaturaMax}°C</strong><span>
                                                        <span class="text-dark"> / <span>
                                                        <span class="text-primary"><strong>${temperaturaMin}°C</strong></span>
                                                    </li>    
                                                    <li class="list-group-item text-center">Humedad ${humedad}%</li>
                                                    <li class="list-group-item text-center">Presion ${presion} hPA</li>
                                                    <li class="list-group-item text-center">Viento ${viento} km/h</li>
                                                </ul>   
                                    </div>              
                                </div>    
                            </div>
                        </div> 
                        <div class="row d-none d-sm-block d-lg-none">
                            <div class="col-12 pb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-7">
                                                <h2 class="text-center">${data.name}</h2>
                                                    <div class="row">
                                                        <div class="col-sm-3"></div>
                                                        <div class="col-sm-6">
                                                            <img class="card-img-top" src="http://openweathermap.org/img/wn/${cieloIcono}@2x.png" alt="${cielo}" />
                                                        </div>
                                                        <div class="col-sm-3"></div>
                                                    </div>
                                                <h3 class="text-center">${temperaturaSens}°C</h3>
                                                <h4 class="text-center mb-3" id="trad">${cielo}</h4>
                                            </div>
                                            <div class="col-sm-5 medio">
                                                <ul class="list-group">
                                                    <li class="list-group-item text-center">
                                                        <p>Temperatura</p>
                                                        <span class="text-danger"><strong>${temperaturaMax}°C</strong><span>
                                                        <span class="text-dark"> / <span>
                                                        <span class="text-primary"><strong>${temperaturaMin}°C</strong></span>
                                                    </li>    
                                                    <li class="list-group-item text-center">Humedad ${humedad}%</li>
                                                    <li class="list-group-item text-center">Presion ${presion} hPA</li>
                                                    <li class="list-group-item text-center">Viento ${viento} km/h</li>
                                                </ul>
                                            </div>
                                        </div>   
                                    </div>              
                                </div>    
                            </div>
                        </div>

                        <div class="d-none d-lg-block">
                            <div class="row">
                                <div class="col-lg-7 col-xl-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="text-center">${data.name}</h2>
                                                <div class="row">
                                                    <div class="col-md-2"></div>
                                                    <div class="col-md-4">
                                                        <img class="card-img-top" src="http://openweathermap.org/img/wn/${cieloIcono}@2x.png" alt="${cielo}" />
                                                    </div>
                                                    <div class="col-md-4 text-center my-auto">
                                                        <h3>${temperaturaSens}°C</h3>
                                                    </div>
                                                    <div class="col-md-2"></div>
                                                </div>    
                                            <h4 class="text-center mb-3" id="trad">${cielo}</h4>
                                        </div>
                                    </div>
                                </div>  
                                
                                <div class="col-lg-5 col-xl-6">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <ul class="list-group">
                                                <li class="list-group-item text-center">
                                                    <p>Temperatura</p>
                                                    <span class="text-danger"><strong>${temperaturaMax}°C</strong><span>
                                                    <span class="text-dark"> / <span>
                                                    <span class="text-primary"><strong>${temperaturaMin}°C</strong></span>
                                                </li>    
                                                <li class="list-group-item text-center">Humedad ${humedad}%</li>
                                                <li class="list-group-item text-center">Presion ${presion} hPA</li>
                                                <li class="list-group-item text-center">Viento ${viento} km/h</li>
                                            </ul>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        input.value = '';
        const dataLocal = localStorage.setItem('dataLocal', JSON.stringify(data));
        const mostrarData = JSON.parse(localStorage.getItem('dataLocal'));
    }); 
}
