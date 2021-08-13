import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from "../state";
import {Patient} from '../types';
import GenderIcon from './GenderIcon';


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
                <div>
                    {state.patients[id].entries.map(entry => {
                        if (entry.diagnosisCodes !== undefined) {

                            return (
                                <div key={entry.id}>
                                    {entry.date} {entry.description}
                                    <ul>
                                        {entry.diagnosisCodes.map(code => (
                                        <li key={code}>{code} {state.diagnoses.find(item => item.code === code)?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ); 
                        }
                        return (
                            <div key={entry.id}>
                                {entry.date} {entry.description}
                            </div>
                        );                       
                    })}
                </div>
            </div>
            }
        </div>
    ); 
};


export default PatientPage;