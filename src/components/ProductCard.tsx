import React from 'react';
import { Star, ShoppingCart, Heart, Eye, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/context/EcommerceContext';
import { useEcommerce } from '@/context/EcommerceContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useEcommerce();
  
  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement quick view modal
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const stockStatus = product.stock <= 5 ? 'low' : product.stock <= 10 ? 'medium' : 'high';

  return (
    <div className="group bg-card rounded-lg border shadow-sm card-hover overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.isNew && (
            <Badge className="badge-new">Nuevo</Badge>
          )}
          {product.isBestseller && (
            <Badge className="badge-bestseller">Bestseller</Badge>
          )}
          {product.isOnSale && discountPercentage > 0 && (
            <Badge className="badge-sale">-{discountPercentage}%</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-9 h-9 p-0 bg-white/90 hover:bg-white shadow-md"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-9 h-9 p-0 bg-white/90 hover:bg-white shadow-md"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Status */}
        {stockStatus === 'low' && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="destructive" className="text-xs">
              Solo quedan {product.stock}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {product.category === 'book' ? 'Libro' : 
             product.category === 'comic' ? 'Comic' : 'Manga'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {product.subcategory}
          </span>
        </div>

        {/* Title & Author */}
        <div>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground">{product.author}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-secondary text-secondary' 
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-1 text-xs text-success">
                <Tag className="h-3 w-3" />
                Ahorras €{(product.originalPrice - product.price).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full transition-bounce"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Agotado' : 
           isInCart ? 'En el carrito' : 
           <><ShoppingCart className="h-4 w-4 mr-2" />Añadir al carrito</>}
        </Button>

        {/* Additional Info */}
        <div className="pt-2 border-t space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Editorial:</span>
            <span>{product.publisher}</span>
          </div>
          {product.pages && (
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Páginas:</span>
              <span>{product.pages}</span>
            </div>
          )}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Idioma:</span>
            <span>{product.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;