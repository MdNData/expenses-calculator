const os = require("os");
const path = require("path");
const { writeFileSync } = require("fs");
const readlineSync = require("readline-sync");

//Function to print the same line
function printSameLine(text) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(text);
}

//Starting application and introduction
console.log(
  `\n\nCalcola i costi mensili in un attimo\n\nBenvenuto ${os.hostname()}\n`
);

//Variables for the file and his path
const fileName = "monthly-expenses";
const fileExtension = ".txt";
const filePath = path.resolve(
  path.resolve("").split("Desktop")[0] + "Desktop",
  fileName + fileExtension
);

//Inform the user where the file will be located
console.log(`Il tuo file si trovera qui : ${filePath}\n`);

//Add Expense orCreate a New file
console.log("Vuoi aggiungere una nuova spesa o iniziare con un nuovo file?\n");

console.log(
  "Scegli 1 o 2 : \n1 Se vuoi aggiungere una nuova spesa\n2 Se vuoi creare un nuovo file\n"
);

let addOrNew = readlineSync.question(">>>   ");

while (addOrNew != 1 && addOrNew != 2) {
  console.log(
    "\nIl numero inserito non rappresenta le scelte possibili, ti prego di selezionare :\n"
  );

  console.log(
    "Scegli 1 o 2 : \n1 Se vuoi aggiungere una nuova spesa\n2 Se vuoi creare un nuovo file\n"
  );

  addOrNew = readlineSync.question(">>>   ");
}

let expensesName = [];
let expensesCost = [];
let finished = 1;
let i = 0;

while (finished != 2) {
  expensesName.push(
    readlineSync.question("\nInserisci il nome della spesa : ")
  );

  expensesCost.push(
    readlineSync.question("\nInserisci il costo della spesa : ")
  );

  finished = readlineSync.question(
    "\nVuoi inserire un'altro valore?\n1 Si\n2 No\n\n>>>   "
  );
}

//saving data
console.log("\nDacci un secondo mentre salviamo i dati inseriti...\n");

for (let i = 0; i < expensesName.length; i++) {
  if (addOrNew == 2 && i == 0) {
    writeFileSync(
      filePath,
      `Nome : ${expensesName[i]} \nPrezzo : ${expensesCost[i]}\n\n`
    );
  } else {
    writeFileSync(
      filePath,
      `Nome : ${expensesName[i]} \nPrezzo : ${expensesCost[i]}\n\n`,
      { flag: "a" }
    );
  }
}

let totalCost = 0;

expensesCost.forEach((cost) => {
  totalCost += Number(cost);
});

writeFileSync(filePath, `Costo Totale Mensile : ${totalCost}`, { flag: "a" });

console.log("\nIl tuo file e pronto!");
