import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export const analyzeSentiment = (text) => {
    return sentiment.analyze(text || '');
};

export const getBiasColor = (score) => {
    if (score > 0) return 'bg-green-600 border-green-700';
    if (score < 0) return 'bg-red-600 border-red-700';
    return 'bg-gray-600 border-gray-700';
};
