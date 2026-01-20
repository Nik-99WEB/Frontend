import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

interface BlogListProps {
  onSelectBlog: (id: string) => void;
  onCreateNew: () => void;
  selectedBlogId: string | null;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('http://localhost:3001/blogs');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

export default function BlogList({
  onSelectBlog,
  onCreateNew,
  selectedBlogId,
}: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <div>Loading blogs...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Latest Articles</h2>
        <Button size="sm" onClick={onCreateNew}>
          Create New Blog
        </Button>
      </div>

      {/* BLOG LIST */}
      <div className="space-y-3">
        {blogs?.map((blog) => {
          const isActive = selectedBlogId === blog.id;

          return (
            <Card
              key={blog.id}
              onClick={() => onSelectBlog(blog.id)}
              className={`cursor-pointer border transition
                ${
                  isActive
                    ? 'border-primary bg-accent/30'
                    : 'border-muted hover:border-primary'
                }`}
            >
              <CardHeader className="pb-2">
                <span className="text-xs font-medium uppercase text-primary">
                  {blog.category[0]}
                </span>
                <CardTitle className="text-sm">
                  {blog.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}