import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateArticleForm() {
  const { id } = useParams(); // get article id from url
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        setForm(response.data);
      }
      catch (error){
        console.error('Error fetching article: ', error);
        alert('Failed to load article for updating')
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try{
      await axios.put(`http://localhost:3000/articles/${id}`, form);
      alert('Article updated successfully');
      navigate('/'); // go back to article list
    }
    catch (error){
      console.error('Error updating article: ', error);
      alert('Failed to update article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
