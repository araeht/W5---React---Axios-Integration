import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3000/api';
  useEffect(() => {
    fetchArticles();
  }, []);

  

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/articles`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    // Delete an article by ID
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      
      // Update state to remove the deleted article
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              // Navigate to update article form with article ID /articles/update/${article.id}
            }}>Update</button>
            <button onClick={() => {
              // Navigate to view article details with article ID /articles/${article.id}
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}