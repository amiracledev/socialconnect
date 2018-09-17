//Team Model
const Team = require("../../../models/Team");

let TeamFunctions = {
    'getTeamNames': () => {
        return new Promise((resolve, reject) => {
            Team.find({}, 'team', {
                    sort: {
                        team: -1
                    }
                },
                function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results);
                });
        });
    },
    'insertOneTeam': (teamName) => {
        return new Promise((resolve, reject) => {
            let query = {
                team: teamName
            }
            Team.find(query, function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                if (results.length == 0) {
                    let team = new Match();
                    team['team'] = teamName;
                    team.save(function (err, team) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        console.log("Saved team :::", team);
                        resolve(true);
                    })
                } else {
                    resolve(false);
                }
            });
        });
    },
    'findAllTeams': (season, callback) => {
        return new Promise((resolve, reject) => {
            Team.find({}, '-__v -_id', function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    },
    'findOneTeam': (season, teamName, callback) => {
        return new Promise((resolve, reject) => {
            let query = {
                "team": teamName
            }
            Team.findOne(query, '-__v -_id', function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    },
    'findTwoTeams': (season, teamNames, callback) => {
        return new Promise((resolve, reject) => {
            let query = {
                $or: [{
                        'team': teamNames[0]
                    },
                    {
                        'team': teamNames[1]
                    }
                ]
            }
            Team.findOne(query, '-__v -_id', function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    },
    'updateOneMap': (season, mapData, callback) => {
        if (mapData['map'] != 'other') {
            let update = {}
            update[mapData['map'] + '.rounds.win'] = mapData['roundsWon'];
            update[mapData['map'] + '.rounds.loss'] = mapData['roundsLoss'];
            if (parseInt(mapData['roundsWon']) > parseInt(mapData['roundsLoss'])) {
                update[mapData['map'] + '.maps.win'] = 1;
                update[mapData['map'] + '.maps.loss'] = 0;
            } else {
                update[mapData['map'] + '.maps.win'] = 0;
                update[mapData['map'] + '.maps.loss'] = 1;
            }
            db.updateOne({
                database: season,
                collection: 'teams',
                query: {
                    'team': mapData['teamName']
                },
                fields: {}
            }, {
                $inc: update
            }, function (data) {
                callback();
            })
        } else {
            callback();
        }
    }
}

module.exports = TeamFunctions;