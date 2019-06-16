import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpened, toggleModal }) => {

    return (
        <div className="profile-modal">
            <button onClick={toggleModal}>Click</button>
        </div>
    );
};

export default Profile;