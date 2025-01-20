import { useReducer } from 'react';
import { IStudent } from '../../types';
import { validateStudent } from '../../utils/validation.ts';
import { useNavigate } from 'react-router-dom';

const INITIAL_STUDENT = { age: 0, coursesList: [], id: '', isGraduated: false, name: '', absents: 0 };

export const useAddForm = (onSubmit: (std: IStudent) => void) => {
  const [student, setStudent] = useReducer<IStudent>(INITIAL_STUDENT);
  const [errorsList, setErrorsList] = useReducer<string[]>([]);
  const [message, setMessage] = useReducer('');
  const [isOpen, setIsOpen] = useReducer(true);
  const nav = useNavigate();

  const handleChange = (field: string, value: any) => {
    setStudent({ ...student, [field]: value });
  };

  const handleCoursesChange = (list: string[]) => {
    setStudent({ ...student, coursesList: list });
  };

  const handleSubmit = () => {
    const newStudent: IStudent = { ...student, id: Date.now().toString() };

    const errors = validateStudent(newStudent);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setErrorsList([]);
      onSubmit(newStudent);
      handleClear();
      setMessage('Student Added Successfully');
      setTimeout(() => {
        nav('/');
      }, 1500);
    }
  };

  const handleClear = () => {
    setStudent(INITIAL_STUDENT);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return {
    student,
    errorsList,
    message,
    isOpen,
    handleChange,
    handleCoursesChange,
    handleSubmit,
    handleClear,
    toggleForm,
  };
};
