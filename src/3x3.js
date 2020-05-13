import {scramble_333} from "./cstimerlib/scramble_333_edit";
import {imagestring, jaapschSeq, setSize} from "./jaapschlib/genScramble";
var nodeHtmlToImage = require("node-html-to-image")
var Jimp = require('jimp')

var fs = require("fs")

module.exports.run = async (bot, message, args, cube) => {
    let scrambles = parseInt(args[0])
    scrambles = scrambles ? scrambles > 12 ? 12 : scrambles < 0 ? 1 : scrambles : 1

    for(let i = 0; i < scrambles; i++) {
        let scramble = [`${i + 1}. `, scramble_333.getRandomScramble()]

        message.channel.send(scramble.join("")).then((msg) => {
            msg.react("👀")
            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👀'),
                {max: 1, time: 15000}).then(collected => {
                if (collected.first().count >= 2) {
                    setSize(3)
                    nodeHtmlToImage({
                        output: './pngs/' + msg.id + '.png',
                        html: imagestring(jaapschSeq(scramble[1], 3))
                    }).then(async () => {
                        let image = await Jimp.read('./pngs/' + msg.id + '.png')
                        image.crop(1, 1, 121, 91).resize(240, 180, Jimp.RESIZE_NEAREST_NEIGHBOR).write('./pngs/' + msg.id + '.png', () => {
                            msg.channel.send("", {
                                file: './pngs/' + msg.id + '.png'
                            }).then(() => {
                                fs.unlinkSync('./pngs/' + msg.id + '.png')
                            })
                        })
                    })
                }
                msg.clearReactions()
            }).catch(() => {
                msg.clearReactions()
            });
        })
    }
};
module.exports.config = { name: "3x3", aliases: ["3x3x3", "3"] }