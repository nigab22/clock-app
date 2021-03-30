import React, { useState } from 'react';
import './App.css';
import Quotes from './Quotes.js';
import Time from './Time.js';
import Expand from './Expand.js';

function App() {
  const [expanded, setExpanded] = useState(false);
  const [background, setBackground] = useState();

  return (
    <div className={`outer-container ${background}`}>
      <div className="inner-container">
        {!expanded && <Quotes />}
        <Time
          expanded={expanded}
          setExpanded={setExpanded}
          changeBackground={(background) => setBackground(background)}
        />
        {expanded && <Expand mode={background} />}
      </div>
    </div>
  );
}

export default App;
