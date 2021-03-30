import React, { useState, useEffect } from 'react';
import Sun from './assets/icon-sun.svg';
import Moon from './assets/icon-moon.svg';

function Greetings(props) {
  const [greeting, setGreeting] = useState();
  const [greetingIcon, setGreetingIcon] = useState();

  useEffect(() => {
    if (props.time) {
      if (props.time >= 5 && props.time < 12) {
        props.changeBackground('day-background');
        setGreeting('Good morning');
        setGreetingIcon(Sun);
      } else if (props.time >= 12 && props.time < 18) {
        props.changeBackground('day-background');
        setGreeting('Good afternoon');
        setGreetingIcon(Sun);
      } else {
        props.changeBackground('night-background');
        setGreeting('Good evening');
        setGreetingIcon(Moon);
      }
    }
  }, [props.time]);

  return (
    <div className="greeting">
      <img className="icon" src={greetingIcon} alt="Greeting Icon" />
      <p>
        {greeting}
        <span>, It is currently</span>
      </p>
    </div>
  );
}

export default Greetings;
