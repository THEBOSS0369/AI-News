export default function SearchBar({ query, setQuery, onSearch, loading }) {
    return (
        <div className="mb-4 flex items-center">
            <input
                type="text"
                className="border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
                placeholder="Search for news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={onSearch}
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded ml-2 hover:bg-blue-700 transition disabled:opacity-50"
            >
                Search
            </button>
        </div>
    );
}
