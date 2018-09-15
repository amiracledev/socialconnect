import React, { Component } from "react";
import { connect } from "react-redux";

class teamStats extends Component {

  render() {
    const { user } = this.props.auth;

    return (
      <div className="teamStats">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Its working</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps
)(teamStats);
