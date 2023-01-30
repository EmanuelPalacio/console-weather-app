import inquirer from "inquirer";
import "colors";
export const inquirerMenu = async () => {
  const question = [
    {
      type: "list",
      name: "option",
      message: "¿Que desea hacer?",
      choices: [
        {
          value: 1,
          name: `${"1.".magenta} Buscar ciudad`,
        },
        {
          value: 2,
          name: `${"2.".magenta} Historial`,
        },
        {
          value: 0,
          name: `${"0.".magenta} salir`,
        },
      ],
    },
  ];

  console.clear();
  console.log(
    "==========================================================".magenta
  );
  console.log("   Selecione una opción");
  console.log(
    "==========================================================\n".magenta
  );
  const { option } = await inquirer.prompt(question);

  return option;
};
export const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presiona ${"ENTER".yellow} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};
export const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};
export const listLocations = async (locations) => {
  const choices = locations.map((location, i) => {
    const position = `${i + 1}`.magenta;
    return {
      value: location.id,
      name: `${position}. ${location.name}`,
    };
  });
  choices.unshift({
    value: 0,
    name: `${"0. ".magenta}Cancelar`,
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar: ",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id;
};
export const SelecTask = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const position = `${i + 1}`.magenta;
    return {
      value: task.id,
      name: `${position}. ${task.description}`,
      checked: task.completedIn,
    };
  });
  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciona",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);

  return ids;
};
export const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};
