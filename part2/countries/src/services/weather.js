import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/3.0/";
const apiKey = import.meta.env.VITE_API_KEY;

const getWeather = (lat, lon) =>
  axios
    .get(
      `${baseUrl}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
    .then((response) => response.data);

export default { getWeather };
