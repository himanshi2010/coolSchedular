import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getToken } from '../Utils/Common';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';

function Home() {
  const [userType, setUserType] = useState("teacher");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios({
      method: 'get', //you can set what request you want to be
      url: 'http://localhost:3001/home',
      // body : {"access-token": getToken()},
      headers: {
         "x-access-token": getToken()
      }
    })
    .then(response => {
      console.log(response.data.payload);
      setUserType(response.data.payload.type);
      setCourses(response.data.payload.courses);
      //console.log(response.data.payload);
    })
    .catch(err => {
    console.log(err);
    });
    }, []);

    if(userType==="teacher")
    {
      return(
          <TeacherPage/>
      )
    }
    else if(userType==="student"){
      return (
        <StudentPage courses={courses}/>
      )
    }
}

export default Home;