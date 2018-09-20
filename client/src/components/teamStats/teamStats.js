import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import axios from 'axios';
import SelectListGroup from "../common/SelectListGroup";
import { Bar } from 'react-chartjs-2';

class teamStats extends Component {

	// Sets instal state object
	constructor() {
		super();
		this.state = {
			chartData: {
				labels: ['Bazaar', 'Cargo', 'Downfall', 'Q1', 'Suburbia', 'Subway', 'Tanker'],
				datasets: []
			},
			legend: true,
			teamA: '',
			teamB: '',
			season: 'Season 5 2018',
			roundsMaps: 'rounds'
		}
		this.refreshChart = this.refreshChart.bind(this)
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push("/not-found");
		}
		if (nextProps.profile.profile) {
			this.setState({ teamA: nextProps.profile.profile.team }, function () {
				this.refreshChart();
			});
		}
	}

	refreshChart() {
		let teamNames = [];
		if (this.state.teamA !== '') teamNames.push(this.state.teamA);
		if (this.state.teamB !== '') teamNames.push(this.state.teamB);
		if (teamNames.length === 0) { this.setState({ legend: false }) } else { this.setState({ legend: true }) };
		let data = {
			teamNames: teamNames,
			roundsMaps: this.state.roundsMaps,
			season: this.state.season
		}
		axios.post('/api/charts/winloss', data)
			.then(response => {
				this.setState({ chartData: { labels: ['Bazaar', 'Cargo', 'Downfall', 'Q1', 'Suburbia', 'Subway', 'Tanker'], datasets: response['data'] } }, function () {
				});
			});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value }, function () {
			this.refreshChart();
		});
	}

	render() {

		const { profile, loading } = this.props.profile;

		const teamOptions = [
			{ label: "* Select a team", value: '' },
			{ label: "Animal House", value: "Animal House" },
			{ label: "Arctic", value: "Arctic" },
			{ label: "Beginners", value: "Beginners" },
			{ label: "Big Red One", value: "Big Red One" },
			{ label: "Blaze", value: "Blaze" },
			{ label: "BossFight", value: "BossFight" },
			{ label: "Burning Chrome", value: "Burning Chrome" },
			{ label: "Cannon Fodder", value: "Cannon Fodder" },
			{ label: "Danglers", value: "Danglers" },
			{ label: "Ember", value: "Ember" },
			{ label: "Equipe Virtuelle Francophone", value: "Equipe Virtuelle Francophone" },
			{ label: "Family Frag", value: "Family Frag" },
			{ label: "Fierce", value: "Fierce" },
			{ label: "French Onward Union", value: "French Onward Union" },
			{ label: "French Power", value: "French Power" },
			{ label: "Fury", value: "Fury" },
			{ label: "G-Men", value: "G-Men" },
			{ label: "Gladiators", value: "Gladiators" },
			{ label: "Globochem", value: "Globochem" },
			{ label: "G.O.E", value: "G.O.E" },
			{ label: "Gravity", value: "Gravity" },
			{ label: "Legionnaires", value: "Legionnaires" },
			{ label: "Lemon Squad", value: "Lemon Squad" },
			{ label: "Magnificent Bastards", value: "Magnificent Bastards" },
			{ label: "Mob Squad", value: "Mob Squad" },
			{ label: "Phoenix", value: "Phoenix" },
			{ label: "Ragnarök", value: "Ragnarök" },
			{ label: "Rome", value: "Rome" },
			{ label: "Ronin", value: "Ronin" },
			{ label: "Silent Purge", value: "Silent Purge" },
			{ label: "Sinister Pride", value: "Sinister Pride" },
			{ label: "SMC Tactical", value: "SMC Tactical" },
			{ label: "Spanish Bull Union", value: "Spanish Bull Union" },
			{ label: "Sponsor", value: "Sponsor" },
			{ label: "Stone Cold Killers", value: "Stone Cold Killers" },
			{ label: "The Great Apes", value: "The Great Apes" },
			{ label: "The Hand of Death", value: "The Hand of Death" },
			{ label: "The Lords of War", value: "The Lords of War" },
			{ label: "The Tactical Illuminati", value: "The Tactical Illuminati" },
			{ label: "The Unit", value: "The Unit" },
			{ label: "Vikings", value: "Vikings" },
			{ label: "VRATH", value: "VRATH" },
			{ label: "Other", value: "Other" }
		];

		const chartOptions = [
			{ label: 'Maps', value: 'maps' },
			{ label: 'Rounds', value: 'rounds' }
		]

		const seasonOptions = [
			{ label: 'Season 5 2018', value: 'Season 5 2018' },
			{ label: 'Season 6 2018', value: 'Season 6 2018' }
		]

		let statContent;

		if (profile === null || loading) {
			statContent = <Spinner />;
		} else {
			statContent = (
				<div>
					<h1 className="display-4">Match Stats</h1>
					<div className="col-md-12">
						<div className="col-md-3" style={{ display: 'inline-block' }}>
							<SelectListGroup
								placeholder="Team"
								name="teamA"
								className="input-sm"
								value={this.state.teamA}
								onChange={this.onChange}
								options={teamOptions}
							/>
						</div>
						<div className="col-md-3" style={{ display: 'inline-block' }}>
							<SelectListGroup
								placeholder="Team"
								name="teamB"
								className="input-sm"
								value={this.state.teamB}
								onChange={this.onChange}
								options={teamOptions}
							/>
						</div>
						<div className="col-md-3" style={{ display: 'inline-block' }}>
							<SelectListGroup
								placeholder="roundsMaps"
								name="roundsMaps"
								className="input-sm"
								value={this.state.roundsMaps}
								onChange={this.onChange}
								options={chartOptions}
							/>
						</div>
						<div className="col-md-3" style={{ display: 'inline-block' }}>
							<SelectListGroup
								placeholder="Season"
								name="season"
								className="input-sm"
								value={this.state.season}
								onChange={this.onChange}
								options={seasonOptions}
							/>
						</div>
						<div className="col-md-12">
							<button className="btn" onClick={this.refreshChart}>Refresh Chart</button>
						</div>
					</div>
					<div className="col-md-12">
						<Bar
							data={this.state.chartData}
							height={100}
							width={400}
							options={{
								maintainAspectRatio: true,
								legend: {
									display: this.state.legend
								}
							}}
						/>
						<div className="col-md-12">
							<p>* Hover for more info.</p>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="teamStats">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{statContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

teamStats.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(teamStats);
