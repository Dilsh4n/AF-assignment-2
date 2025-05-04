import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1"; 


export const fetchAllCountries = () => axios.get(`${BASE_URL}/all`)
export const fetchByName = (name) => axios.get(`${BASE_URL}/name/${name}`)
export const fetchByRegion = (region) => axios.get(`${BASE_URL}/region/${region}`)
export const fetchByCode = (code) => axios.get(`${BASE_URL}/alpha/${code}`);