import { getBiasColor } from '../lib/utils/sentiment';

export default function ArticleCard({ article }) {
    return (
        <div className={`p-4 border-l-4 mb-4 rounded-lg ${getBiasColor(article.biasScore)} border-opacity-75`}>
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
    );
}
