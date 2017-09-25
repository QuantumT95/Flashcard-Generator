var inquirer = require('inquirer');
var fs = require('fs');

var cardData = require('./CloseCard.json');
console.log(cardData);

function ClozeCard(fullText,answer){
	var clozePositions = clozeDelete(fullText, answer);

	this.partial = getPartial(fullText,clozePositions);

	this.answer = answer;

	function clozeDelete(fullText,answer){
		var start = fullText.indexOf(answer);
		if(start !== -1){
			return [start, start+answer.length];
		}
		throw new Error("Could not find answer in fullText");
	}

	function getPartial(fullText,clozePositions){
		var start = fullText.slice(0,clozePositions[0]);
		var end = fullText.slice(clozePositions[1],fullText.length);
		return start+" ... "+end;
	}
}

function createNewCard(){
	inquirer.prompt([
	{
		type:"input",
		name:"fullText",
		message:"What is the fullText you want to ask?"
	},
	{
		type:"input",
		name:"answer",
		message:"What is the answer?"
	}]).then(function(inputs){
		var card = new ClozeCard(inputs.fullText,inputs.answer);

		console.log(card);

		cardData.push(card);

		var newCardData = JSON.stringify(cardData,null,'\t');
		fs.writeFile('./CloseCard.json',newCardData,function(err){
			if(err)throw err;
			console.log("Done!");
		})
		console.log(card);
	})
};

createNewCard();	