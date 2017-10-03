// requiring npm packages
var inquirer = require("inquirer");
var colors = require("colors");
var fs = require("fs");


// requiring extrenal js constructors and question Data
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var basicCardData = require("./basicCardData.json");
var clozeCardData = require("./clozeCardData.json");

// Setting Global variables
var clozeArray = [];
var clozeCards;
var index = 0;
var correct = 0;
var incorrect = 0;

// Function to create the cloze card to show the "..." instead of a word
function clozeDeck() {
	for (var i = 0; i < clozeCardData.length; i++) {
		clozeCards = new ClozeCard(clozeCardData[i].text, clozeCardData[i].cloze);
		clozeArray.push(clozeCards);
	}
}


start();

function start() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?".red,
      choices: ["Play Basic Card Game", "Play Cloze Card Game", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.choices === "Play Basic Card Game") {
        startBasicGame();
      }
      else if (answer.choices === "Play Cloze Card Game") {
      	clozeDeck();
        startClozeGame();
      }
      else if (answer.choices === "Quit") {
        quitGame();
      }
    });
}
function startBasicGame() {
	if (index < basicCardData.length) {
		console.log("\n" + ("--------------------------------").yellow + "\n");
		inquirer.prompt([
			{
				name: "front",
				type: "input",
				message: ("Answer the Question:\n" + basicCardData[index].front)	
			}
		]).then(function(answer) {
			if ((answer.front) === (basicCardData[index].back)) {
				console.log("You got it right!".green);
				correct++;
			}
			else {
				console.log("That's not right. The correct answer is: " + basicCardData[index].back);
				incorrect++;
			}
			index++;
			startBasicGame();
		});		
	}
	else {
		console.log("Correct: " + correct, "Incorrect: " + incorrect);
		start();
	}	
};
function startClozeGame() {
	if (index < clozeArray.length) {
		console.log("\n" + ("--------------------------------").yellow + "\n");
		inquirer.prompt([
			{
				name: "text",
				type: "input",
				message: ("Fill in the Blank:\n" + clozeArray[index].partial)	
			}
		]).then(function(answer) {
			if (answer.text === clozeArray[index].cloze) {
				console.log("You got it right!".green);
				correct++;
			}
			else {
				console.log("That's not right. The correct answer is: ".red + clozeArray[index].cloze);
				incorrect++;
			}
			index++;
			startClozeGame();
		});		
	}
	else {
		console.log("Correct: " + correct, "Incorrect: " + incorrect);
		start();
	}	
};
function quitGame() {
	
		console.log("Maybe next time?".blue);
		process.exit();			
};














