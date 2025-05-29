import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.status}`);
        }
        const data = await response.json();
        setArticle(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchArticle();
    } else {
      setError('No article ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>
      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}