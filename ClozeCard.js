
function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, "...");
 	if(text.indexOf(cloze) == -1){
 	console.log("There seems to be a problem!")
 	throw Error
	}
}

// ClozeCard.prototype.partial = function () {
//    return this.text.replace(this.cloze, "...");
// };


module.exports = ClozeCard;