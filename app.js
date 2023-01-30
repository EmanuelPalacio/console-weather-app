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
        const location = locations.find((location) => id === location.id);
        console.log(location);

        console.log("\nInformación de la ciudad\n");
        console.log("Ciudad:" + location.name);
        console.log("Lat: " + location.lat);
        console.log("Lng: " + location.lng);
        console.log("Temperatura: ");
        console.log("Mínima: ");
        console.log("Máxima: ");
        break;
      case 2:
        //mostrar el historial de las busquedas realizadas
        break;
      case 0:
        //salir de la app
        break;
    }
    opt !== 0 && (await pause());
  } while (opt !== 0);
};
main();
