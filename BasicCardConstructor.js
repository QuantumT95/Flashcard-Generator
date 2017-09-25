var inquirer = require("inquirer");
var fs = require('fs');

var cardData = require('./BasicCard.json');
console.log(cardData);

function BasicCard(frontSide,backSide){
	this.front = frontSide;
	this.back = backSide;
}

function createNewCard(){
	inquirer.prompt([
	{
		type:"input",
		name:"frontSide",
		message:"What is the question you want to ask?"
	},
	{
		type:"input",
		name:"backSide",
		message:"What is the answer to the question above?"
	}]).then(function(inputs){
		var card = new BasicCard(inputs.frontSide,inputs.backSide);
		cardData.push(card);

		var newCardData = JSON.stringify(cardData,null,'\t');
		fs.writeFile('./BasicCard.json',newCardData,function(err){
			if(err)throw err;
			console.log("Done!");
		})
		console.log(card);
	})
};


createNewCard();
