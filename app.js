import {
  inquirerMenu,
  pause,
  readInput,
  listLocations,
} from "./helpers/inquirer.js";
import Searches from "./models/searches.js";

const main = async () => {
  let opt;
  const searches = new Searches();
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const search = await readInput("Ciudad: ");
        const locations = await searches.location(search);
        const id = await listLocations(locations);

        if (id === 0) continue;

        const location = locations.find((location) => id === location.id);
        searches.addToHistory(location);
        const weatherData = await searches.weatherData(location);

        console.log("\nInformación de la ciudad\n");
        console.log("Ciudad:" + location.name);
        console.log("Lat: " + location.lat);
        console.log("Lng: " + location.lng);
        console.log("Temperatura: " + weatherData.temp);
        console.log("Mínima: " + weatherData.temp_min);
        console.log("Máxima: " + weatherData.temp_max);
        break;
      case 2:
        searches.history.forEach((location, i) => {
          const position = i + 1;
          console.log(`${position}. ${location.name}`);
        });
        break;
    }
    opt !== 0 && (await pause());
  } while (opt !== 0);
};
main();
