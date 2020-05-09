module.exports.run = async (bot, message, args, cube) => {
	let msgArr = [];
	let scrambles = parseInt(args[0]);
	scrambles = scrambles ? scrambles > 6 ? 6 : scrambles < 0 ? 1 : scrambles : 1;

	for(var i = 0; i < scrambles; i++) {
		for(var i = 1, scramble = []; i < 78; i++) {
			if(i !== 1 && i % 11 === 0) {
				scramble[i - 2][2] === "-" ? scramble.push("U\'\n") : scramble.push("U\n");
			} else if(i === 1 || scramble[i - 2][0] === "D" || scramble[i - 2][0] === "U") {
				scramble.push(`R${Math.random() < 0.5 ? "++" : "--"}`);
			} else {
				scramble.push(`D${Math.random() < 0.5 ? "++" : "--"}`);
			}
		}
		msgArr.push(`\`\`\`\n${scramble.join(" ").replace(/U\n R/g, "U\nR").replace(/U'\n R/g, "U\'\nR")}\n\`\`\``);
	}
	for(var i = 0; i < msgArr.length; i++) {msgArr[i] = (i+1) + ". " + msgArr[i]}; return message.channel.send(msgArr.join("\n\n"));
};
module.exports.config = { name: "megaminx", aliases: ["mega", "minx", "mm", "m"] };
