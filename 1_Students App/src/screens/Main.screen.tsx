import { useContext, useEffect, useRef, useReducer } from "react";
import Student from "../components/student/student.component";
import { IStudent } from "../types";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { StateContext } from "../providers/stateProvider";

const COURSES_FILTERS = ['Math', 'HTML', 'CSS', 'OOP'];

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  const { totalAbsents, studentsList } = state;

  const [filteredList, setFilteredList] = useReducer<IStudent[]>(studentsList);
  const [params, setParams] = useSearchParams();
  const lastStdRef = useRef<HTMLDivElement>(null);

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const query = params.get('q') || '';
    const graduated = params.get('graduated');
    const courses = params.getAll('courses');

    if (query) {
      setFilteredList(studentsList.filter(std => std.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredList(studentsList);
    }

    if (graduated === 'grad') {
      setFilteredList(oldState => (oldState.filter(std => std.isGraduated)));
    } else if (graduated === 'non-grad') {
      setFilteredList(oldState => (oldState.filter(std => std.isGraduated == false)));
    }

    if (courses.length) {
      // OR
      // setFilteredList(oldState => (oldState.filter(std => std.coursesList.some(c => (courses.includes(c))))));

      // AND
      setFilteredList(oldState => (oldState.filter(std => courses.every(c => (std.coursesList.includes(c))))));
    }
  }, [params, studentsList]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setParams(params);
  }

  const handleGardFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === 'all') {
      params.delete('graduated');
    } else {
      params.set('graduated', v);
    }
    setParams(params);
  }

  const handleCourseFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      params.append('courses', course);
    } else {
      params.delete('courses', course);
    }
    setParams(params);
  }

  if (state.studentsList.length === 0) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="main-screen">
      <h2>Students List</h2>
      <div className="stats">
        <button onClick={() => dispatch({ type: "REMOVE_FIRST" })}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>Total Absents {totalAbsents}</b>
      </div>
      <div className="filter">
        <input type="search" placeholder="Search" onChange={handleSearch} value={params.get('q') || ''} />
        <select value={params.get('graduated') || 'all'} onChange={handleGardFilter}>
          <option value="all">All</option>
          <option value="grad">Graduated</option>
          <option value="non-grad">Not Graduated</option>
        </select>
        <div>
          {
            COURSES_FILTERS.map(c => (
              <React.Fragment key={c}>
                <input
                  id={c}
                  type="checkbox"
                  value={c}
                  onChange={handleCourseFilter}
                  checked={params.getAll('courses').includes(c)}
                />
                <label htmlFor={c}>{c}</label>&nbsp;&nbsp;
              </React.Fragment>
            ))
          }
        </div>
      </div>
      {
        filteredList.length
          ? (
            <div className="list">
              {
                filteredList.map(student => (
                  <Student
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    age={student.age}
                    absents={student.absents}
                    isGraduated={student.isGraduated}
                    coursesList={student.coursesList}
                    mode="list"
                  />
                ))
              }
            </div>
          )
          : <h3>No results found!</h3>
      }
      <div ref={lastStdRef}></div>
    </div>
  )
}

export default Main;