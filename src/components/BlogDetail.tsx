import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Share } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

interface BlogDetailProps {
  blogId: string;
}

const fetchBlog = async (id: string): Promise<Blog> => {
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
};

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlog(blogId),
    enabled: !!blogId,
  });

  const [copied, setCopied] = useState(false);

  if (isLoading) return <div>Loading blog...</div>;
  if (error) return <div>Error loading blog</div>;
  if (!blog) return <div>No blog found</div>;

  const shareText = `Check out this blog: ${blog.title} - ${blog.description}`;
  const shareUrl = window.location.href;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(blog.title);
    const body = encodeURIComponent(`${blog.description}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`);
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`
    );
  };

  return (
    <div className="space-y-6">

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-[320px] object-cover rounded-xl"
      />

      <p className="text-sm text-primary font-medium">
        {blog.category.join(', ')} • {new Date(blog.date).toDateString()}
      </p>

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <p className="text-sm text-muted-foreground">{blog.description}</p>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share Article
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64">
          <div className="grid gap-2">
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>

            <Button
              onClick={handleEmailShare}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              Email
            </Button>

            <Button
              onClick={handleWhatsAppShare}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              WhatsApp
            </Button>

            <Button
              onClick={handleTwitterShare}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              Twitter
            </Button>

            <Button
              onClick={handleFacebookShare}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              Facebook
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border rounded-lg p-4">
        <div className="text-center">
          <p className="text-xs uppercase text-muted-foreground">Category</p>
          <p className="text-sm font-medium">{blog.category.join(', ')}</p>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase text-muted-foreground">Read Time</p>
          <p className="text-sm font-medium">5 Mins</p>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase text-muted-foreground">Date</p>
          <p className="text-sm font-medium">
            {new Date(blog.date).toDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-7 text-muted-foreground">
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

    </div>
  );
}
