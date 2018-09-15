import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.team}</h4>
        <p>
          <strong>Duration:</strong>{" "}
          <Moment format="MM/DD/YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="MM/DD/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Title:</strong> {exp.title}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Experience</h3>

            {expItems.length > 0 ? (
              <ul className="list-group">{expItems}</ul>
            ) : (
              <p className="text-center">No Experience Listed</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
