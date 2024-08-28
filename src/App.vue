<template>
    <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
      <main>
        <div class="search-box">
          <input 
            type="text" 
            class="search-bar" 
            placeholder="Search..."
            v-model="query"
            @keypress="fetchWeather"
          />
        </div>
  
        <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
          <div class="location-box">
            <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
            <div class="date">{{ dateBuilder() }}</div>
          </div>
  
          <div class="weather-box">
            <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'app',
    data () {
      return {
        api_key: 'ecc53b2658584c4216d364bedbc3063f',
        url_base: 'https://api.openweathermap.org/data/2.5/',
        query: '',
        weather: {}
      }
    },
    methods: {
      fetchWeather (e) {
        if (e.key == "Enter") {
          fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
            .then(res => {
              return res.json();
            }).then(this.setResults);
        }
      },
      setResults (results) {
        this.weather = results;
      },
      dateBuilder () {
        let d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
  
        return `${day} ${date} ${month} ${year}`;
      }
    }
  }
  </script>
  
  
  <style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #1a1a2e;
  color: #e0e0e0;
}

/* App Background */
#app {
  background-image: url('./assets/cold-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  transition: background-image 0.3s ease-in-out;
}

#app.warm {
  background-image: url('./assets/warm-bg.jpg');
}

/* Main Content */
main {
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(34, 34, 45, 0.85);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

/* Location Box */
.location-box {
  text-align: center;
  margin-bottom: 15px;
}

.location-box .location {
  color: #e0e0e0;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;
}

.location-box .date {
  color: #a0a0a0;
  font-size: 16px;
  font-weight: 400;
}

/* Search Box */
.search-box {
  width: 100%;
  max-width: 450px;
  margin-bottom: 25px;
  text-align: center;
}

.search-box .search-bar {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 2px solid #333;
  border-radius: 12px;
  background-color: #2d2d44;
  color: #e0e0e0;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.search-box .search-bar:focus {
  border-color: #3498db;
  background-color: #3e3e5e;
}

/* Weather Box */
.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 12px 20px;
  color: #e0e0e0;
  font-size: 80px;
  font-weight: bold;
  margin: 20px 0;
  background-color: rgba(52, 152, 219, 0.75); /* Default blue color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease; /* Smooth transition */
}

/* Change temp color when warm */
#app.warm .weather-box .temp {
  background-color: rgba(231, 76, 60, 0.75); /* Red color for warm state */
}

.weather-box .weather {
  color: #e0e0e0;
  font-size: 36px;
  font-weight: 500;
  margin-top: 8px;
}

/* Media Queries for Mobile and Desktop */
@media (min-width: 768px) {
  main {
    padding: 70px 40px;
  }

  .search-box {
    width: 60%;
    max-width: 500px;
  }

  .location-box .location {
    font-size: 36px;
  }

  .location-box .date {
    font-size: 18px;
  }

  .weather-box .temp {
    font-size: 100px;
  }

  .weather-box .weather {
    font-size: 48px;
  }
}

  </style>