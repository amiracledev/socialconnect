import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      team: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      twitter: "",
      facebook: "",
      twitch: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");
      //if profil doesnt exist
      profile.team = !isEmpty(profile.team) ? profile.team : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";

      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitch = !isEmpty(profile.social.twitch)
        ? profile.social.twitch
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.steam = !isEmpty(profile.social.steam)
        ? profile.social.steam
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Setfields state
      this.setState({
        handle: profile.handle,
        team: profile.team,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        steam: profile.steam,
        twitch: profile.twitch,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      team: this.state.team,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      twitch: this.state.twitch,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      steam: this.state.steam
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL (Make sure to add https://)"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL (Make sure to add https://)"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Twitch Profile URL (Make sure to add https://)"
            name="twitch"
            icon="fab fa-twitch"
            value={this.state.twitch}
            onChange={this.onChange}
            error={errors.twitch}
          />

          <InputGroup
            placeholder="YouTube Channel URL (Make sure to add https://)"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="SteamPage URL (Make sure to add https://)"
            name="steam"
            icon="fab fa-steam"
            value={this.state.steam}
            onChange={this.onChange}
            error={errors.steam}
          />
          <InputGroup
            placeholder="Instagram URL "
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    const region = [
      { label: "* Select your Region", value: 0 },
      { label: "America East", value: "America East" },
      { label: "America West", value: "America West" },
      { label: "Europe", value: "Europe" },
      { label: "Asia & Australia", value: "Asia & Australia" },
      { label: "Other", value: "Other" }
    ];
    const options = [
      { label: "* Select GamedIN Status", value: 0 },
      { label: "Noob", value: "Noob" },
      { label: "Player", value: "Player" },
      { label: "Recruit", value: "Recruit" },
      { label: "Reservist", value: "Reservist" },
      { label: "Pro League Player", value: "Pro League Player" },
      { label: "Co-Captain", value: "Co-Captain" },
      { label: "Team Captain", value: "Team Captain" },
      { label: "League Moderator", value: "League Moderator" },
      { label: "Sponsor", value: "Sponsor" },
      { label: "Other", value: "Other" }
    ];
    const teamOptions = [
      { label: "* Select your team", value: 0 },
      { label: "Actively Looking", value: "Actively Looking" },
      { label: "Reservist", value: "Reservist" },
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
      {
        label: "Equipe Virtuelle Francophone",
        value: "Equipe Virtuelle Francophone"
      },
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

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your gamer name."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
				  classes="form-control-lg"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your gaming career"
                />
                <SelectListGroup
                  placeholder="Team"
                  name="team"
				  classes="form-control-lg"
                  value={this.state.team}
                  onChange={this.onChange}
                  options={teamOptions}
                  error={errors.team}
                  info="Your current team."
                />
                {/* <TextFieldGroup
                  placeholder="Team"
                  name="team"
                  value={this.state.team}
                  onChange={this.onChange}
                  error={errors.team}
                  info="Your current team."
                /> */}
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Personal, Team, or if you are a Sponsor then your company's website"
                />
                <SelectListGroup
                  placeholder="Location"
                  name="location"
				  classes="form-control-lg"
                  value={this.state.location}
                  onChange={this.onChange}
                  options={region}
                  error={errors.location}
                  info="Your location"
                />
                {/* <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="city & state or Country with time zone"
                /> */}
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    Sniper, Machine gunner, Strongest maps?, and any extra skills you bring to a team)"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself...your team...your company....your gaming experience...times & days available ...and anything you'd like to share"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="common positive-primary"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
