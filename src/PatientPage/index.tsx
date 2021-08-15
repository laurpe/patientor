import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from "../state";
import {Patient} from '../types';
import GenderIcon from './GenderIcon';
import EntryDetails from './EntryDetails';


const PatientPage = () => {
    const {id} = useParams<{id: string}>();
    const [state, dispatch] = useStateValue();

    React.useEffect(() => {
        if (state.patients[id] && state.patients[id].ssn) {
            return;
        }
        const fetchPatient = async () => {
            try {
                const {data: patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(patientFromApi));
            } catch (error) {
                throw new Error(error.message);
            }
        };
        void fetchPatient();
    }, [id, dispatch, state.patients]);

    return (
        <div>
            {state.patients[id] &&
            <div>
                <h2>{state.patients[id].name} <GenderIcon gender={state.patients[id].gender}/></h2>
                <div>
                    ssn: {state.patients[id].ssn}
                </div>
                <div>
                    occupation: {state.patients[id].occupation}
                </div>
                <h3>Entries</h3>
                {state.patients[id].entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
            </div>
            }
        </div>
    ); 
};


export default PatientPage;