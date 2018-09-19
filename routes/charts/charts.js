const express = require("express");
const router = express.Router();

const WebFunctions = require('./shared/WebFunctions');
const MatchFunctions = require('./shared/MatchFunctions');
const TeamFunctions = require('./shared/TeamFunctions');

const Season = require('../../models/Seasons');

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

router.route('/teams').get((req, res) => {
	let teams = [
		{
		"team": "Vikings"
	}, {
		"team": "VRATH"
	}, {
		"team": "VR Elite - AW"
	}, {
		"team": "The Unit"
	}, {
		"team": "The Lords of War"
	}, {
		"team": "The Hand of Death"
	}, {
		"team": "The Great Apes"
	}, {
		"team": "THE TACTICAL ILLUMINATI"
	}, {
		"team": "Stone Cold Killers"
	}, {
		"team": "Spanish Bull Union"
	}, {
		"team": "Sinister Pride"
	}, {
		"team": "Silent Purge"
	}, {
		"team": "Shatterpoint"
	}, {
		"team": "SMC Tactical"
	}, {
		"team": "Ronin"
	}, {
		"team": "Ragnarök"
	}, {
		"team": "ROME"
	}, {
		"team": "Phoenix"
	}, {
		"team": "Pack 1"
	}, {
		"team": "Mob Squad"
	}, {
		"team": "Magnificent Bastards"
	}, {
		"team": "Lemon Squad!"
	}, {
		"team": "Legionnaires"
	}, {
		"team": "Gravity"
	}, {
		"team": "Globochem"
	}, {
		"team": "Gladiators"
	}, {
		"team": "G.O.E."
	}, {
		"team": "G-Men"
	}, {
		"team": "Fury"
	}, {
		"team": "French Power"
	}, {
		"team": "French Onward Union"
	}, {
		"team": "Family Frag"
	}, {
		"team": "FIERCE"
	}, {
		"team": "Equipe Virtuelle Francophone"
	}, {
		"team": "Ember"
	}, {
		"team": "Danglers"
	}, {
		"team": "Cannon Fodder"
	}, {
		"team": "Burning Chrome"
	}, {
		"team": "BossFight"
	}, {
		"team": "Blaze"
	}, {
		"team": "Big Red One"
	}, {
		"team": "Beginners"
	}, {
		"team": "Arctic"
	}, {
		"team": "Animal House"
	}, {
		"team": "Amateur Hour"
	}]
	for (let index in teams) {
		TeamFunctions.insertOneTeam(teams[index]['team']).then(() => {
			if (index == teams.length - 1) res.send('done');
		});
	}
});

router.route('/createseason').get((req,res) =>{
	let season5_data = {
		season: 'Season 5',
		startDate: new Date(2018, 5, 25),
		endDate: new Date(2018, 7, 31)
	}
	let season5 = new Season(season5_data);
	season5.save(function(err, new_season5){
		if(err){
			console.error(err);
		}
		let season6_data ={
			season: 'Season 5',
			startDate: new Date(2018, 8, 1)
		}
		let season6 = new Season(season6_data);
		season6.save(function(err, new_season6){
			if(err){
				console.error(err);
			}
			res.json({new_season5, new_season6});
		});
	});
});

module.exports = router;