import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

interface PatientIdAndEntry {
  id: string;
  entry: Entry;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[]
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: PatientIdAndEntry;
  };

  export const setPatientList = (patients: Patient[]) => {
    return {
      type: "SET_PATIENT_LIST" as const,
      payload: patients
    };
  };

  export const setDiagnosisList = (diagnoses: Diagnosis[]) => {
    return {
      type: "SET_DIAGNOSIS_LIST" as const,
      payload: diagnoses
    };
  };

  export const addPatient = (patient: Patient) => {
    return {
      type: "ADD_PATIENT" as const,
      payload: patient
    };
  };

  export const updatePatient = (patient: Patient) => {
    return {
      type: "UPDATE_PATIENT" as const,
      payload: patient
    };
  };

  export const addEntry = (id: string, entry: Entry) => {
    return {
      type: "ADD_ENTRY" as const,
      payload: {
        id,
        entry
      }
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const newState = {...state};  
      newState.patients[action.payload.id] = action.payload;
      
      return {
        ...state,
        patients: newState.patients
      };
    case "ADD_ENTRY":
      const copyOfState = {...state};
      copyOfState.patients[action.payload.id].entries.push(action.payload.entry);

      return {
        ...state,
        patients: copyOfState.patients
      };
    default:
      return state;
  }
};
