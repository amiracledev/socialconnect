//Match Model
const Match = require("../../../models/Match");

let MatchFunctions = {
    'insertOneMatch': (match) => {
        return new Promise((resolve, reject) => {
            let query = {
                'date': match['date'],
                'homeTeam': match['homeTeam'],
                'awayTeam': match['awayTeam']
            }
            Match.find(query, function (results) {
                if (results.length == 0) {
                    let match = new Match(match);
                    match.save(function (err, match) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        console.log("Saved match :::", match);
                        resolve(true);
                    })
                } else {
                    resolve(false);
                }
            });
        });
    },
    'findAllMatches': () => {
        return new Promise((resolve, reject) => {
            Match.find({}, function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        })
    },
    'fineOneTeamMatches': (teamName) => {
        return new Promise((resolve, reject) => {
            let query = {
                $or: [{
                    'homeTeam': teamName
                }, {
                    'awayTeam': teamName
                }]
            }
            Match.find(query, function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    },
    'findOneMatch': (teamA, teamB) => {
        return new Promise((resolve, reject) => {
            let query = {
                $or: [{
                        'homeTeam': teamA,
                        'awayTeam': teamB
                    },
                    {
                        'homeTeam': teamB,
                        'awayTeam': teamA
                    }
                ]
            }
            Match.find(query, function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = MatchFunctions;