import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

interface CreateBlogProps {
  onBlogCreated: (id: string) => void;
}

const createBlog = async (blog: Omit<Blog, 'id' | 'date'>): Promise<Blog> => {
  const response = await fetch('http://localhost:3001/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...blog,
      date: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create blog');
  }
  return response.json();
};

export default function CreateBlog({ onBlogCreated }: CreateBlogProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onBlogCreated(data.id);
      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setCoverImage('');
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      category: category.split(',').map(c => c.trim()),
      description,
      coverImage,
      content,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category (comma separated)</label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image URL</label>
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Blog'}
        </Button>
        {mutation.isError && <div className="text-red-500">Error: {mutation.error.message}</div>}
      </form>
    </div>
  );
}