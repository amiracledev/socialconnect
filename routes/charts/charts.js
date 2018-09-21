const express = require("express");
const router = express.Router();

const WebFunctions = require('./shared/WebFunctions');
const MatchFunctions = require('./shared/MatchFunctions');
const TeamFunctions = require('./shared/TeamFunctions');
const SeasonFunctions = require('./shared/SeasonFunctions');

const Season = require('../../models/Season');

const winLoss = require("./chartTypes/winLoss");

router.use('/winloss', winLoss);

router.route('/').get((req, res) => {
	WebFunctions.getMatches().then(() => {
		WebFunctions.getAllMatchInfo().then((matches) => {
			for (let index in matches) {
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
					} else {
						if (index == matches.length - 1) {
							res.send('done')
						}
					}
				});
			}
		});
	});
});

/* router.route('/teams').get((req, res) => {
	let teams = [];
	MatchFunctions.findAllMatches().then(matches => {
		for (let match of matches) {
			if (teams.indexOf(match['homeTeam']) == -1) teams.push(match['homeTeam']);
			if (teams.indexOf(match['awayTeam']) == -1) teams.push(match['awayTeam']);
		}
		if (teams.indexOf('VR Elite - AW') == -1) teams.push('VR Elite - AW')
		console.log(teams);
		return;
	}).then(() => {
		for (let index in teams) {
			TeamFunctions.insertOneTeam(teams[index], 'Season 6 2018').then(() => {
				if (index == teams.length - 1) res.send('done');
			});
		}
	});

}); */

router.route('/setwinloss').get((req, res) => {
	let season = req.query.season.replace('"', '').replace('"', '')
	SeasonFunctions.findSeason(season).then(result => {
		TeamFunctions.resetTeamWinLoss(result['season']).then(() => {
			if (result['endDate'] == null) result['endDate'] = new Date().toISOString();
			let query = {
				'$and': [{
						date: {
							$gte: result['startDate']
						}
					},
					{
						date: {
							$lte: result['endDate']
						}
					}
				]
			}
			MatchFunctions.findAllMatches(query).then(matches => {
				for (let index in matches) {
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
						TeamFunctions.updateOneMap(homeTeamMap, season).then(() => {
							TeamFunctions.updateOneMap(awayTeamMap, season).then(() => {
								if (i == 3) {
									if (index == matches.length - 1) {
										res.send('done')
									}
								}
							})
						})
					}
				}
			})
		});
	});
});

/* router.route('/resetteam').get((req, res) => {
	TeamFunctions.resetTeamWinLoss('Season 5 2018').then(() => {
		res.send('done');
	})
}) */

/* router.route('/createseason').get((req, res) => {
	let season5_data = {
		season: 'Season 5 2018',
		startDate: new Date(2018, 5, 25).toISOString(),
		endDate: new Date(2018, 7, 31).toISOString()
	}
	SeasonFunctions.insertOneSeason(season5_data).then(result => {
		res.send(result);
	});
}); */

module.exports = router;