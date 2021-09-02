import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry) => void;
  error?: string;
  entryType: string
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryType }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new {entryType} entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {entryType === "Health Check" &&
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
      {entryType === "Occupational Healthcare" &&
        <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
      {entryType === "Hospital" &&
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;