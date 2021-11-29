import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import history from '../Utils/History';
import { getUser, removeUserSession, getToken } from '../Utils/Common';

function Schedule (props) {
    const [slots, setSlots] = useState([]);
    const [order, setOrder] = useState([0, 0, 0, 0, 0, 0]);
    const [reqStatus, setReqStatus] = useState("notrequested");
    var today = new Date(); // get current date
    var first = today.getDate() - today.getDay() + 1 + 7; 
    var last = first + 5; 

    const firstday = new Date(today.setDate(first)).toDateString();
    const lastday = new Date(today.setDate(last)).toDateString();
    const data = JSON.stringify({data:{ courseCode: props.course }})
    useEffect(() => {
    axios({
      method: 'post', //you can set what request you want to be
      url: 'http://localhost:3001/home/getSlotsForStudent',
      // body : {"access-token": getToken()},
      data:data,   
      headers: {
        "Content-Type" : "application/json",
        "x-access-token": getToken()
      }
    })
    .then(response => {
        setSlots(response.data.payload.slots.slots);
        setReqStatus(response.data.payload.type);
    })
    .catch(err => {
      console.log(err);
    });
    }, []);

    const handleChange = (i) => e => {
      e.preventDefault();
      e.value = e.target.value;
      var newOrder = order;
      newOrder[i] = e.target.value;
      setOrder(newOrder);
    }

    const handleSubmit = e => {
      e.preventDefault();
      var slotsToSend = Array(slots.length);
      for(var i = 0; i < order.length; ++i) {
        if(order[i] !== 0)
          slotsToSend[order[i] - 1] = {
            startTime: slots[i].startTime,
            endTime: slots[i].endTime
          }
      }

      var data = {data: {courseCode: props.course, order:slotsToSend}};
      axios
        .post("http://localhost:3001/home/registerPriority", data, {headers: {"x-access-token" : getToken()}})
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    const SlotList=() => {
        var SlotArray = [];
        for(var i = 0; i < slots.length; ++i) {
          var parsedStartDate = new Date(slots[i].startTime);
          var endStartDate = new Date(slots[i].endTime);
          var day = parsedStartDate.getDay();
          switch(day) {
            case 0: day = "Sunday"; break;
            case 1: day = "Monday"; break;
            case 2: day = "Tuesday"; break;
            case 3: day = "Wednesday"; break;
            case 4: day = "Thursday"; break;
            case 5: day = "Friday"; break;
            case 6: day = "Saturday"; break;
          }

          var slotStr1 = parsedStartDate.toLocaleTimeString();
          var slotStr2 = endStartDate.toLocaleTimeString();
          SlotArray.push(
            <form>
              <ul>
                  <li>  
                      {day}: {slotStr1} - {slotStr2}
                  </li>
                  <input type="text" onChange={handleChange(i)}/>
              </ul>
            </form>
          );
        }
        return (
            <div>
                {SlotArray}
                <form>
                  <input disabled={reqStatus==="requested"} type="button" value = "submit" onClick={handleSubmit}/>
                </form>
            </div>
        )
    }

    return(
        <div>
            <h4>Schedule for Upcoming Week - Week of {firstday}  </h4>
            <h5>Please enter your priorities for the given slots and we'll get back to you after allotment of slots.</h5>
            <p>{reqStatus}!</p>
            <SlotList/>
        </div>
    )
}



function StudentPage(props){
    const user = getUser();
    const subjects=props.courses;
    
    const handleLogout = () => {
        removeUserSession();
        history.push('/');
        window.location.reload();
      }

    const SubjectList=() => {
        const SubjectArray=subjects.map((subject)=> (
          <Box sx={{minWidth: 275},{minHeight: 600}}>
          <Card variant="outlined" name={subject.courseName}>
            <CardContent>
              <Typography variant="h5" component="div">
                {subject.courseName} - {subject.courseCode}
              </Typography>
              <Schedule course={subject.courseCode}/>
            </CardContent>
          </Card>
          </Box>
            
        ));
        return(
          <div>
            {SubjectArray}
          </div>
        );
      }

        return (
            <div>
               Welcome {user} !<br /><br />
               <input type="button" onClick={handleLogout} value="Logout" /> 
              <p> Deadline for Submission of preferences is Saturday midnight.</p>
               <SubjectList />

            </div>
        )
    
}

export default StudentPage
