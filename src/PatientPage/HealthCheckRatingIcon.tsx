import React from 'react';
import { HealthCheckRating } from '../types';
import { Icon } from 'semantic-ui-react';


const HealthCheckRatingIcon = ({rating}: {rating: HealthCheckRating}) => {
    return (
        <>
        {rating === 0 && <Icon color="green" name="heart" /> ||
        rating === 1 && <Icon color="yellow" name="heart" /> ||
        rating === 2 && <Icon color="orange" name="heart" /> ||
        rating === 3 && <Icon color="red" name="heart" />}
        </>
    );
};


export default HealthCheckRatingIcon;