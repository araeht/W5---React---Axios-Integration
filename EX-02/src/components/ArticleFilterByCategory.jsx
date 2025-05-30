import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    try{
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    }
    catch (error){
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilter = async () => {
    try{
      let url = 'http://localhost:3000/articles';
      if(selectedCategory){
        url += `?categoryId=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setArticles(response.data);
    }
    catch (error) {
      console.error('Error filter articles:', error);
    }
  };

  const handleReset = () => {
    setSelectedCategory('');
    fetchArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button onClick={handleFilter} disabled={!selectedCategory}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Category: {categories.find(c => c.id === article.categoryId)?.name || 'Unknown'}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}