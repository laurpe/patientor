import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, addEntry, updatePatient } from "../state";
import {Entry, NewEntry, Patient} from '../types';
import GenderIcon from './GenderIcon';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import {Button } from "semantic-ui-react";


const PatientPage = () => {
    const {id} = useParams<{id: string}>();
    const [state, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
  
    const submitNewEntry = async (values: NewEntry) => {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        
        dispatch(addEntry(id, newEntry));
        closeModal();
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data || 'Unknown error');
      }
    };

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
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal} />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    ); 
};


export default PatientPage;