import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

interface Quote {
  author: string;
  content: string;
}

function App() {
  const defaultQuote: Quote = { author: "Matthew Larsen", content: "You'll never see this." };
  const [randomQuote, setRandomQuote] = useState<Quote | null>(defaultQuote);

  const [searchText, setSearchText] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function loadRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await result.json();
    setRandomQuote(quote);
  };

  useEffect(() => {
    loadRandomQuote();
  }, []);

  function handleSubmit(event) {
    event.preventDefault(); // Keep the page from refreshing
    console.log(searchText);
  };

  return (
    <div className="App">
      <h2 className="header">Quote Search</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>
      </div>
      <div>
        <p className="quote">{randomQuote.content}</p>
        <p className="author">-{randomQuote.author}</p>
      </div>
    </div>
  )
}

export default App
