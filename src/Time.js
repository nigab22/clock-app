import React, { useState, useEffect } from 'react';
import ArrowUp from './assets/icon-arrow-up.svg';
import ArrowDown from './assets/icon-arrow-down.svg';
import Greeting from './Greeting.js';
import './Time.css';

function Time(props) {
  const [time, setTime] = useState('00:00');
  const [militaryTime, setMilitaryTime] = useState('00:00');
  const [timezone, setTimezone] = useState('America/New_York');
  const [timezoneAbbreviation, setTimezoneAbbr] = useState();
  const [city, setCity] = useState();
  const [countryCode, setCountryCode] = useState();
  const { DateTime } = require('luxon');

  useEffect(() => {
    fetch('https://freegeoip.app/json/')
      .then((response) => response.json())
      .then((data) => {
        setCity(data.city);
        setCountryCode(data.country_code);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    fetch('http://worldtimeapi.org/api/ip')
      .then((response) => response.json())
      .then((data) => {
        setTimezone(data.timezone);
        setTimezoneAbbr(data.abbreviation);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    let regularTime;
    let militaryTime;
    setInterval(() => {
      regularTime = DateTime.now()
        .setZone(timezone)
        .toLocaleString(DateTime.TIME_SIMPLE)
        .slice(0, -2);
      setTime(regularTime);

      militaryTime = DateTime.now()
        .setZone(timezone)
        .toLocaleString(DateTime.TIME_24_SIMPLE);

      setMilitaryTime(parseInt(militaryTime.substr(0, 2)));
    }, 1000);
  }, []);

  return (
    <section className="content-container">
      <div className="text-content">
        <Greeting
          time={militaryTime}
          changeBackground={props.changeBackground}
        />
        <div className="time">
          <h1 className="bold">{time}</h1>
          <p>{timezoneAbbreviation}</p>
        </div>
        <p className="city bold">
          In {city}, {countryCode}
        </p>
      </div>
      <button
        onClick={() => props.setExpanded(!props.expanded)}
        className="bold"
      >
        <div className="text">{props.expanded ? 'Less' : 'More'}</div>
        <div className="circle">
          <img src={props.expanded ? ArrowUp : ArrowDown} alt="up arrow" />
        </div>
      </button>
    </section>
  );
}

export default Time;
