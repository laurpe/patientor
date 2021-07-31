import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from "../state";
import {Patient} from '../types';
import GenderIcon from './GenderIcon';


const PatientPage = () => {
    const {id} = useParams<{id: string}>();
    const [{patients}, dispatch] = useStateValue();

    React.useEffect(() => {
        if (patients[id] && patients[id].ssn) {
            return;
        }
        const fetchPatient = async () => {
            try {
                const {data: patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch({type: "UPDATE_PATIENT", payload: patientFromApi});
            } catch (error) {
                throw new Error(error.message);
            }
        };
        void fetchPatient();
    }, [id, dispatch, patients]);

    return (
        <div>
            {patients[id] &&
            <div>
                <h2>{patients[id].name} <GenderIcon gender={patients[id].gender}/></h2>
                <div>
                    ssn: {patients[id].ssn}
                </div>
                <div>
                    occupation: {patients[id].occupation}
                </div>
            </div>
            }
        </div>
    ); 
};


export default PatientPage;