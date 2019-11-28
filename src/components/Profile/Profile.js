import React from 'react';

import Button from '../../components/UI/Button/Button';
import './Profile.css';

const profile = (props) => {
    if(props.profileData){
        return (
            <article className="Profile" onClick={props.clicked}>
                <p><span className="Label">Name: </span>{props.profileData.name}</p>
                <p><span className="Label">Email: </span>{props.profileData.email}</p>
                <p><span className="Label">Address: </span>{props.profileData.street + ", " + props.profileData.county}</p>
                <p><span className="Label">ZipCode: </span>{props.profileData.zipCode}</p>
                <Button btnType="Edit" clicked={props.swithToEditMode}>EDIT PROFILE</Button>
            </article>
        );
    } else {
        return (
            <article className="Profile" onClick={props.clicked}>
                <Button btnType="Edit" clicked={props.swithToEditMode}>EDIT PROFILE</Button>
            </article>
        );
    }
}

export default profile;