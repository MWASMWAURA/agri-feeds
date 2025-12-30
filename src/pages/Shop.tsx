import { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { FloatingGrain } from '@/components/FloatingGrain';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ViewToggle } from '@/components/ViewToggle';
import { Pagination } from '@/components/Pagination';
import { useAdmin, AdminProduct } from '@/context/AdminContext';

const ITEMS_PER_PAGE = 20;

const Shop = () => {
  const { products, searchProducts, filterProductsByCategory } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort by popularity (manually popular first, then by sales count)
    result = [...result].sort((a, b) => {
      if (a.isManuallyPopular && !b.isManuallyPopular) return -1;
      if (!a.isManuallyPopular && b.isManuallyPopular) return 1;
      return b.salesCount - a.salesCount;
    });

    return result;
  }, [products, searchQuery, selectedCategory, searchProducts]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingGrain count={10} />
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-8xl uppercase mb-4">
              Shop <span className="text-stroke">All</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-lg mx-auto">
              Premium feeds for every animal on your farm. 
              Quality nutrition, happy livestock! 🌾
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="space-y-4 mb-8">
            {/* First Row: Search */}
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Second Row: Filters and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 bg-accent/20 rounded-2xl border-2 border-foreground">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <CategoryFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <ViewToggle 
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
                {(searchQuery || selectedCategory !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-foreground text-background rounded-full font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8">
            <p className="font-mono text-sm text-muted-foreground text-center">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>

          {/* Products Display */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                /* Grid View - 4 columns for 4x5 layout */
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      delay={index * 50}
                      showPopularBadge={true}
                      isListView={false}
                    />
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4 mb-8">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      delay={index * 50}
                      showPopularBadge={true}
                      isListView={true}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-2xl uppercase mb-4">No products found</h3>
              <p className="font-mono text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-foreground text-background rounded-full font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
