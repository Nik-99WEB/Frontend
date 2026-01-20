 import { useState } from 'react';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState<'detail' | 'create'>('detail');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id);
    setMode('detail');
  };

  const handleCreateNew = () => {
    setMode('create');
  };

  const handleBlogCreated = (id: string) => {
    setSelectedBlogId(id);
    setMode('detail');
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="flex-1">

        {/* HERO SECTION */}
        <div className="border-b bg-background">
          <div className="mx-auto max-w-7xl px-6 py-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              CA Monk Blog
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends in finance, accounting, and career growth
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-1">
              <BlogList
                onSelectBlog={handleSelectBlog}
                onCreateNew={handleCreateNew}
                selectedBlogId={selectedBlogId}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-2">
              {mode === 'detail' && selectedBlogId ? (
                <BlogDetail blogId={selectedBlogId} />
              ) : mode === 'create' ? (
                <CreateBlog onBlogCreated={handleBlogCreated} />
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Select a blog to view details or create a new one.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;
