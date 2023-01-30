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
export default class Searches {
  constructor() {}
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
}
