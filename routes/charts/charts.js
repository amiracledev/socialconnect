const express = require("express");
const router = express.Router();

const WebFunctions = require('./shared/WebFunctions');
const MatchFunctions = require('./shared/MatchFunctions');
const TeamFunctions = require('./shared/TeamFunctions');

const winLoss = require("./chartTypes/winLoss");

router.use('/winloss', winLoss);

router.route('/').get((req, res) => {
    WebFunctions.getMatches().then(() => {
        WebFunctions.getAllMatchInfo().then((matches) => {
            for (let index in matches) {
                console.log(index);
                MatchFunctions.insertOneMatch(matches[index]).then((inserted) => {
                    if (inserted) {
                        for (let i = 1; i < 4; i++) {
                            let homeTeamMap = {
                                teamName: matches[index]['homeTeam'],
                                map: matches[index]['map' + i]['mapName'],
                                roundsWon: matches[index]['map' + i]['scoreHome'],
                                roundsLoss: matches[index]['map' + i]['scoreAway']
                            }
                            let awayTeamMap = {
                                teamName: matches[index]['awayTeam'],
                                map: matches[index]['map' + i]['mapName'],
                                roundsWon: matches[index]['map' + i]['scoreAway'],
                                roundsLoss: matches[index]['map' + i]['scoreHome']
                            }
                            TeamFunctions.updateOneMap(homeTeamMap).then(() => {
                                TeamFunctions.updateOneMap(awayTeamMap).then(() => {
                                    if (i == 3) {
                                        if (index == matches.length - 1) {
                                            res.send('done')
                                        }
                                    }
                                })
                            })
                        }
                    }
                    if (index == matches.length - 1) {
                        res.send('done')
                    }
                });
            }
        });
    });
});


module.exports = router;