import React, {useEffect, useState} from 'react';
import '../Styles/Schedule.css';
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai';

const Schedule = () => {

    const date = new Date();

    const months = [
        "January",
        "February",
        "March", 
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

   useEffect(() => {
    handleRenderCalendar();
    }, []) 

    const handleRenderCalendar = () => {
    let firstDayIndex;

    if(date.getDate() > 7 && date.getDate() < 14) {
        firstDayIndex = date.getDate() - 9;
    }
    else if(date.getDate() > 14 && date.getDate() < 21) {
        firstDayIndex = date.getDate() - 16;
    }
    else if(date.getDate() > 21 && date.getDate() > 28) {
        firstDayIndex = date.getDate() - 23;
    }

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    let nextDays = 0;

    if(lastDayIndex !== 6) {
        nextDays = 7 - lastDayIndex - 1;
    }

    const monthDays = document.getElementById('calendarDays');
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); 
    
    document.getElementById('calendarTitleText').innerHTML = months[date.getMonth()];
    document.getElementById('calendarTitleDesc').innerHTML = date.toDateString();

    let days = "";

    for(let x = firstDayIndex; x > 0; x--) {
        days += `<div id='prev-date'>${prevLastDay - x + 1}</div>`;
    }

    for(let i = 1; i <= endDate; i++) {
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div id='today'>${i}</div>`;
        }
        else {
            days += `<div>${i}</div>`;
        }
    }

    for(let j = 1; j <= nextDays; j++) {
        days += `<div id='next-date'>${j}</div>`;
    }

    monthDays.innerHTML = days;
    }

   const handleLeftArrow = () => {
    date.setMonth(date.getMonth() - 1)
    handleRenderCalendar();
   }

   const handleRightArrow = () => {
    date.setMonth(date.getMonth() + 1)
    handleRenderCalendar();
}

    return(
        <div id='calendarAll'>
            <div id='calendarContainer'>
                <div id='calendarTitle'>
                    <h3 id='calendarTitleText'></h3>
                    <div id='calendarTitleDesc'></div>
                    <div id='monthArrowLeft' onClick={handleLeftArrow}><AiOutlineLeft/></div>
                    <div id='monthArrowRight' onClick={handleRightArrow}><AiOutlineRight/></div>
                </div>
                <div id='weekdayNames'>
                    <div id='sun'>Sun</div>
                    <div id='Mon'>Mon</div>
                    <div id='Tue'>Tue</div>
                    <div id='Wed'>Wed</div>
                    <div id='Thu'>Thu</div>
                    <div id='Fri'>Fri</div>
                    <div id='Sat'>Sat</div>
                </div>
                <div id='calendarDays'></div>
            </div>
        </div>
    )
}

export default Schedule;