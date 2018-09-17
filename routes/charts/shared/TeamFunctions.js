//Team Model
const Team = require("../../../models/Team");

let TeamFunctions = {
	'getTeamNames': () => {
		return new Promise((resolve, reject) => {
			Team.find({}, '-_id team', {
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
			Team.find(query, function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				if (results) {
					let team = new Team();
					team['team'] = teamName;
					team.save(function (err, team) {
						if (err) {
							console.error(err);
							reject(err);
						}
						resolve(true);
					})
				} else {
					resolve(false);
				}
			});
		});
	},
	'findAllTeams': () => {
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
	'findOneTeam': (teamName) => {
		return new Promise((resolve, reject) => {
			let query = {
				"team": teamName
			}
			Team.findOne(query, '-__v -_id', function (err, result) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(result);
			});
		});
	},
	'findTwoTeams': (teamNames) => {
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
			Team.find(query, '-__v -_id', function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				resolve(results);
			});
		});
	},
	'updateOneMap': (mapData) => {
		return new Promise((resolve, reject) => {
			if (mapData['map'] != 'other') {
				let query = {
					'team': mapData['teamName']
				}
				Team.findOne(query, function (err, team) {
					if (err) {
						console.error(err);
						reject(err);
					}
					if (team == null) {
						team = new Team();
						team['team'] = mapData['teamName'];
						team.save(function (err, team) {
							if (err) {
								console.error(err);
								reject(err);
							}
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
							team.update({
								$inc: update
							}, function (err, team) {
								if (err) {
									console.error(err);
									reject(err);
								}
								resolve();
							})
						});
					} else {
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
						team.update({
							$inc: update
						}, function (err, team) {
							if (err) {
								console.error(err);
								reject(err);
							}
							resolve();
						})
					}
				});
			} else {
				resolve();
			}
		});
	}
}

module.exports = TeamFunctions;