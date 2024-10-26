'use client';
import { useState } from 'react';
import axios from 'axios';
import Sentiment from 'sentiment';
import '../app/globals.css';


export default function Home() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = 'edfd2cb5bc194d2aa87664619a90549d'; // Replace with your actual API key
    const sentiment = new Sentiment();

    const fetchNews = async () => {
        setLoading(true);
        try {
            const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&apiKey=${API_KEY}`;
            const response = await axios.get(url);

            const analyzedArticles = response.data.articles.map(article => {
                const analysis = sentiment.analyze(article.description || article.content || '');
                return {
                    ...article,
                    biasScore: analysis.score
                };
            });

            setArticles(analyzedArticles);
        } catch (error) {
            console.error('Error fetching news:', error);
            alert('Failed to fetch news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getBiasColor = (score) => {
        if (score > 0) return 'bg-green-600 border-green-700';
        if (score < 0) return 'bg-red-600 border-red-700';
        return 'bg-gray-600 border-gray-700';
    };
    
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">AI NEWS AGGREGATOR WITH BIAS DETECTION</h1>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        className="border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
                        placeholder="Search for news..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={fetchNews}
                        className="bg-blue-600 text-white p-2 rounded ml-2 hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>

                {loading && <p className="text-center">Loading...</p>}

                <div>
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div
                                key={index}
                                className={`p-4 border-l-4 mb-4 rounded-lg ${getBiasColor(article.biasScore)} border-opacity-75 hover-rgb-border`}
                            >
                                {/* Display image if available */}
                                {article.urlToImage && (
    <div className="relative overflow-hidden h-48 rounded-lg mb-4">
        <img
            src={article.urlToImage}
            alt="Article Image"
            className="w-full h-auto transform scale-100 transition-transform duration-1000 ease-linear hover:translate-y-[-50%]"
        />
    </div>
)}


                                <h2 className="text-3xl font-semibold">{article.title}</h2>
                                <p className="text-gray-300 mt-2">{article.description}</p>
                                <p className="mt-2">
                                    <strong>Bias Score:</strong> {article.biasScore !== undefined ? article.biasScore.toFixed(2) : 'N/A'}
                                </p>
                                <a
                                    href={article.url}
                                    className="text-blue-400 underline hover:text-blue-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-center">No articles found. Try searching for something else.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
    const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'kBd9dfQbxOBJNNjEKjH03zmotxmobtFQ'
      },
      body: JSON.stringify({
        pluginIds: [],
        externalUserId: "1234"
      })
    });
  
    const data = await response.json();
    return data.data.id; // Extract session ID
  }
  
  // Function to submit a query using the session ID
  async function submitQuery(apiKey, sessionId, query) {
    const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1729884933'],
        responseMode: 'sync'
      })
    });
  
    const data = await response.json();
    return data;
  }
  
  // Example usage
  (async () => {
    const apiKey = 'kBd9dfQbxOBJNNjEKjH03zmotxmobtFQ';
    const externalUserId = '1234';
    const query = 'RAHUL GHANDHI';
  
    try {
      const sessionId = await createChatSession(apiKey, externalUserId);
      const response = await submitQuery(apiKey, sessionId, query);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  
