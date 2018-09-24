import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Styles/notification.css';

const Notification = ({ error, type, message }) => {
    return (
        <div className={'notification ' + type + ' ' + (error ? 'notification-enter' : '')}>
            <p className='notification-text'><FontAwesomeIcon icon="times" className='notification-icon' />{message}</p>
        </div>
    );
  };

export default Notification;