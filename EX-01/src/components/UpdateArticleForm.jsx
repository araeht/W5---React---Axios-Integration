import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    // Fetch the article by ID and prefill the form
    axios.get(`/api/articles/${id}`)
      .then(res => {
        setForm({
          title: res.data.title || '',
          content: res.data.content || '',
          journalistId: res.data.journalistId || '',
          categoryId: res.data.categoryId || '',
        });
      })
      .catch(err => {
        // Handle error (optional)
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put(`/api/articles/${id}`, form);
      navigate('/'); // Redirect after update
    } catch (err) {
      // Handle error (optional)
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
