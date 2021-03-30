import React, { useState, useEffect } from 'react';
import Refresh from './assets/icon-refresh.svg';
import './Quotes.css';

function Quotes() {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="quote-container">
      <section className="quote">
        <p>{quote}</p>
        <p className="author bold">{author}</p>
      </section>
      <div onClick={fetchQuotes}>
        <img className="refresh" src={Refresh} alt="" />
      </div>
    </div>
  );
}

export default Quotes;
