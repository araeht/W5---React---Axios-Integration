import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try{
      const response = await axios.get('http://localhost:3000/articles');
      setArticles(response.data);
    }
    catch (error){
      console.error('Error fetching articles:', error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try{
      const response = await axios.get('http://localhost:3000/journalists');
      setJournalists(response.data);
    }
    catch (error){
      console.error('Error fetching journalists:', error);
    }
  };

  const handleFilter = async () => {
    try{
      let url = 'http://localhost:3000/articles';
      if(selectedJournalist){
        url += `?journalistId=${selectedJournalist}`;
      }
      const response = await axios.get(url);
      setArticles(response.data);
    }
    catch (error){
      console.error('Error filtering articles:', error);
    }
  };

  const handleReset = () => {
    setSelectedJournalist('');
    fetchArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" value={selectedJournalist} onChange={(e) => setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map((j) => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <button onClick={handleFilter} disabled={!selectedJournalist}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist: {journalists.find(j => j.id === article.journalistId)?.name || 'Unknown'}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}