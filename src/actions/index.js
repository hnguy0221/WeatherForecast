import axios from 'axios';

const API_KEY = 'e7865e1800cc5df9c8db7e56ad763d75';
const herokuURL = 'https://cors-anywhere.herokuapp.com/';
const ROOT_URL = `${herokuURL}https://api.darksky.net/forecast/${API_KEY}`;//e7865e1800cc5df9c8db7e56ad763d75/40.066375,-105.213161'

export const FETCH_WEATHER = 'fetch_weather';

export function fetchWeather(lat, lon) {
	const url = `${ROOT_URL}/${lat},${lon}`;
	console.log(url);
    const request = axios.get(url);
    //console.log('Request:', request);
    return {
        type: FETCH_WEATHER,
        payload: request
    }   
}