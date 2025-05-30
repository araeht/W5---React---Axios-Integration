import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    try{
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    }
    catch (error){
      console.error('Error fetching categories:', error);
    }
  }

  const handleFilter = async () => {
    try{
      let url = 'http://localhost:3000/articles';
      const params = [];
      if(selectedJournalist) params.push(`journalistId=${selectedJournalist}`);
      if(selectedCategory) params.push(`categoryId=${selectedCategory}`);
      if(params.length > 0) url += `?${params.join('&')}`;

      const response = await axios.get(url);
      setArticles(response.data);
    }
    catch (error){
      console.error('Failed to filter articles:', error);
    }
  }

  const handleReset = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
    fetchArticles(); // reset to all articles
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

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist: {journalists.find(j => j.id === article.journalistId)?.name || 'Unknown'} | Category: {categories.find(c => c.id === article.categoryId)?.name || 'Unknown'}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}