//Match Model
const Match = require("../../../models/Match");

let MatchFunctions = {
	'insertOneMatch': (match) => {
		return new Promise((resolve, reject) => {
			let query = {
				'date': new Date(match['date']),
				'homeTeam': match['homeTeam'],
				'awayTeam': match['awayTeam']
			}
			Match.findOne(query, function (err, results) {
				if (err) {
					console.error(err);
					reject(err);
				}
				if (results == null) {
					let new_match = new Match(match);
					new_match['date'] = match['date'];
					new_match.save(function (err, new_match) {
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
	'findAllMatches': (query) => {
		return new Promise((resolve, reject) => {
			Match.find(query, function (err, results) {
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