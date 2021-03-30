import React, { useEffect, useState } from 'react';
import './Expand.css';

function Expand(props) {
  const [timezone, setTimezone] = useState('timezone');
  const [dayOfYear, setDayOfYear] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [weekNumbers, setWeekNumbers] = useState();
  const [colorMode, setColorMode] = useState();

  useEffect(() => {
    fetch('http://worldtimeapi.org/api/ip')
      .then((response) => response.json())
      .then((data) => {
        setTimezone(data.timezone);
        setDayOfYear(data.day_of_year);
        setDayOfWeek(data.day_of_week);
        setWeekNumbers(data.week_number);
      });
  }, []);

  useEffect(() => {
    if (props.mode) {
      props.mode == 'day-background'
        ? setColorMode('day-mode')
        : setColorMode('night-mode');
    }
  }, [props.mode]);

  return (
    <div className={`expand-container ${colorMode}`}>
      <div className="content-box">
        <div className="left-side">
          <div>
            <p className="first-line">Current Timezone</p>
            <h2>{timezone.replace('_', ' ')}</h2>
          </div>
          <div>
            <p className="second-line">Day of the year</p>
            <h2>{dayOfYear}</h2>
          </div>
        </div>
        <div className="right-side">
          <div>
            <p className="first-line">Day of the week</p>
            <h2>{dayOfWeek}</h2>
          </div>
          <div>
            <p className="second-line">Week numbers </p>
            <h2>{weekNumbers}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expand;
