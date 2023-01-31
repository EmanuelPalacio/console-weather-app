import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const mapBox = axios.create({
  baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/`,
  params: {
    access_token:
      "pk.eyJ1IjoiZW1hbnVlbGRldiIsImEiOiJjbGRqOTB0Yngxb296M3dwdGY5bDNhd2h6In0.R9ISTGiRJT2S4lx3wl1RLA",
    limit: 5,
    lenguage: "es",
  },
});
const weatherLocation = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/weather`,
  params: {
    appid: process.env.OPEN_WHEATER_KEY,
    units: "metric",
    lang: "es",
  },
});

export default class Searches {
  history = [];
  constructor() {
    this.readDB();
  }
  async location(location = "") {
    try {
      const getData = await mapBox.get(`${location}.json`);
      return getData.data.features.map((e) => ({
        id: e.id,
        name: e.place_name,
        lng: e.center[0],
        lat: e.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async weatherData(data) {
    try {
      const getData = await weatherLocation.get("", {
        params: { lat: data.lat, lon: data.lng },
      });

      return getData.data.main;
    } catch (error) {
      console.log(error);
    }
  }
  saveDB() {
    fs.writeFileSync(
      "./db/database.json",
      JSON.stringify(this.history, null, 2)
    );
  }
  addToHistory(location) {
    if (this.history.includes(location)) {
      return;
    } else {
      this.history.unshift(location);
      this.saveDB();
    }
  }
  readDB() {
    let data;
    try {
      data = JSON.parse(fs.readFileSync("./db/database.json", "utf-8"));
    } catch (error) {
      data = [];
    }
    this.history = data;
  }
}
