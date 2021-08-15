import React from 'react';
import {Entry} from '../types';
import './entryStyle.css';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';
import { Icon } from 'semantic-ui-react';


const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return (
                <div className="entry">
                    <div>
                        <h3>{entry.date} <Icon name="user md"/></h3>
                    </div>
                    <div>{entry.description}</div>
                    <div><HealthCheckRatingIcon rating={entry.healthCheckRating}/></div>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div className="entry">
                    <div>
                        <h3>{entry.date} <Icon name="stethoscope"/> {entry.employerName}</h3>
                    </div>
                    {entry.description}
                </div>
            );
        case "Hospital":
            return (
                <div className="entry">
                    <div>
                        <h3>{entry.date} <Icon name="hospital"/></h3>
                    </div>
                    {entry.description}
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;