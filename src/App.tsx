import { useEffect, useState } from 'react'

interface Quote {
  _id: string;
  author: string;
  content: string;
}

function App() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

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

  async function handleSubmit(e) {
    e.preventDefault(); // Keep the page from refreshing
    setSearchPerformed(true);
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchText);
    const quoteList = await result.json();
    setQuotes(quoteList.results);
  };

  return (
    <div className="App">
      { !searchPerformed &&
        <div id="RandomQuote">
          <h2 className="header">Quote Search</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                className="searchBar"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </form>
          </div>
          { randomQuote != null &&
            <div>
              <p className="quote">{ randomQuote.content }</p>
              <p className="author">-{ randomQuote.author }</p>
            </div>
          }
        </div>
      }
      { searchPerformed &&
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                className="searchBar"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </form>
          </div>
          <div>
            {
              quotes.map((quote) => (
                <div key={quote._id}>
                  <p className="quote">{ quote.content }</p>
                  <p className="author">-{ quote.author }</p>
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App
