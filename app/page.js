'use client'
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ArticleCard from './components/ArticleCard';
import { fetchNewsArticles } from './lib/services/news';
import { analyzeSentiment } from './lib/utils/sentiment';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const fetchedArticles = await fetchNewsArticles(query);
            const analyzedArticles = fetchedArticles.map(article => ({
                ...article,
                biasScore: analyzeSentiment(article.description || article.content || '').score
            }));
            setArticles(analyzedArticles);
        } catch (error) {
            console.error('Error fetching news:', error);
            alert('Failed to fetch news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    AI NEWS AGGREGATOR WITH BIAS DETECTION
                </h1>
                
                <SearchBar 
                    query={query}
                    setQuery={setQuery}
                    onSearch={handleSearch}
                    loading={loading}
                />

                {loading && <p className="text-center">Loading...</p>}

                <div>
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <ArticleCard key={index} article={article} />
                        ))
                    ) : (
                        !loading && <p className="text-center">No articles found. Try searching for something else.</p>
                    )}
                </div>
            </div>
        </div>
    );
}