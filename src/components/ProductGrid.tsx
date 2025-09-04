import React, { useMemo } from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import { useEcommerce } from '@/context/EcommerceContext';
import { sampleProducts } from '@/data/products';

const ProductGrid = () => {
  const { state, dispatch } = useEcommerce();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...sampleProducts];

    // Apply search filter
    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.author.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.subcategory.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (state.filters.category.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.category.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1]
    );

    // Apply rating filter
    if (state.filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= state.filters.rating);
    }

    // Apply stock filter
    if (state.filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Apply sale filter
    if (state.filters.onSale) {
      filtered = filtered.filter(product => product.isOnSale);
    }

    // Apply sorting
    switch (state.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [state.searchTerm, state.filters, state.sortBy]);

  const handleSortChange = (value: string) => {
    dispatch({ 
      type: 'SET_SORT_BY', 
      payload: value as typeof state.sortBy
    });
  };

  const handleCategoryFilter = (category: string) => {
    const currentCategories = state.filters.category;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    dispatch({
      type: 'SET_FILTERS',
      payload: { category: newCategories }
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        category: [],
        priceRange: [0, 100],
        rating: 0,
        inStock: true,
        onSale: false,
      }
    });
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {state.searchTerm ? `Resultados para "${state.searchTerm}"` : 'Nuestros Productos'}
          </h2>
          <p className="text-muted-foreground">
            Mostrando {filteredAndSortedProducts.length} productos
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select value={state.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Más popular</SelectItem>
              <SelectItem value="newest">Más nuevo</SelectItem>
              <SelectItem value="rating">Mejor valorado</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium">Filtros rápidos:</span>
        
        <Button
          variant={state.filters.category.includes('book') ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryFilter('book')}
        >
          Libros
        </Button>
        
        <Button
          variant={state.filters.category.includes('comic') ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryFilter('comic')}
        >
          Comics
        </Button>
        
        <Button
          variant={state.filters.category.includes('manga') ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryFilter('manga')}
        >
          Mangas
        </Button>

        <Button
          variant={state.filters.onSale ? "default" : "outline"}
          size="sm"
          onClick={() => dispatch({ 
            type: 'SET_FILTERS', 
            payload: { onSale: !state.filters.onSale } 
          })}
        >
          En oferta
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="ml-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground mb-4">
              Prueba ajustando tus filtros o términos de búsqueda
            </p>
            <Button onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More / Pagination could go here */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Cargar más productos
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;