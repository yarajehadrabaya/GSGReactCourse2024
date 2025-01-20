// src/reducers/studentsReducer.ts

import { IStudent } from '../types';

type State = {
  students: IStudent[];
  totalAbsents: number;
};

type Action =
  | { type: 'ADD_STUDENT'; payload: IStudent }
  | { type: 'UPDATE_ABSENTS'; payload: { id: string; absents: number } }
  | { type: 'REMOVE_STUDENT'; payload: string };

export const initialStudentsState: State = {
  students: [],
  totalAbsents: 0,
};

export const studentsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
        totalAbsents: state.totalAbsents + action.payload.absents,
      };

    case 'UPDATE_ABSENTS':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id
            ? { ...student, absents: action.payload.absents }
            : student
        ),
        totalAbsents: state.students.reduce((total, student) =>
          student.id === action.payload.id
            ? total + action.payload.absents - student.absents
            : total, state.totalAbsents),
      };

    case 'REMOVE_STUDENT':
      const removedStudent = state.students.find(student => student.id === action.payload);
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
        totalAbsents: removedStudent
          ? state.totalAbsents - removedStudent.absents
          : state.totalAbsents,
      };

    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }





  















};
