import axios from 'axios';

const API_KEY = ''; // Add your API key here

export const fetchNewsArticles = async (query) => {
    try {
        const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&apiKey=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch news articles');
    }
};
