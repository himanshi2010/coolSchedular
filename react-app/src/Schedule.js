import React, { Component } from 'react'

function Schedule  (props) {
        const sub = "hins";
        console.log(props.course);
        var today = new Date; // get current date
        var first = today.getDate() - today.getDay() + 1 + 7; 
        var last = first + 6; 

        var firstday = new Date(today.setDate(first)).toDateString();
        var lastday = new Date(today.setDate(last)).toDateString();
        return (
            <div>
                <h4>student name</h4>
                <h4>teacher name</h4>
                <h4>schedule for upcoming week - {firstday} to {lastday}</h4>
                <br></br>
                <br></br>
                <form>
                    <ul>
                        <li>
                            Monday
                        </li>
                        <li>
                            Tuesday
                        </li>
                        <li>
                            Wednesday
                        </li>
                        <li>
                            Thursday
                        </li>
                        <li>
                            Friday
                        </li>
                        <li>
                            Saturday
                        </li>
                    </ul>
                </form>
            </div>
        )
    
}

export default Schedule
