import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';


const GenderIcon = ({gender}: {gender: Gender}) => {

    return (
        <>
        {gender === "male" && <Icon name="mars" /> ||
        gender === "female" && <Icon name="venus" /> ||
        gender === "other" && <Icon name="genderless" />}
        </>
    );
};

export default GenderIcon;