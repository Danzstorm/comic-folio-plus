import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Book, Bookmark, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEcommerce } from '@/context/EcommerceContext';

const Header = () => {
  const { state, dispatch } = useEcommerce();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  const categories = [
    { name: 'Libros', icon: Book, path: '/books' },
    { name: 'Comics', icon: Bookmark, path: '/comics' },
    { name: 'Mangas', icon: Gamepad2, path: '/mangas' },
  ];

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: value });
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gradient-secondary text-secondary-foreground py-2 px-4 text-center text-sm font-medium">
        🚚 Envío GRATIS en pedidos superiores a €35 | 📚 Hasta 30% OFF en bestsellers
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary text-primary-foreground p-2 rounded-lg">
                <Book className="h-6 w-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">BookVerse</h1>
                <p className="text-xs text-muted-foreground">Libros • Comics • Mangas</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar libros, comics, mangas..."
                  className="pl-10 pr-4 w-full"
                  value={state.searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="h-5 w-5" />
                <span className="ml-2 hidden lg:block">
                  {state.user ? state.user.name : 'Cuenta'}
                </span>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs badge-new">
                    {wishlistCount}
                  </Badge>
                )}
                <span className="ml-2 hidden lg:block">Wishlist</span>
              </Button>

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden lg:block">Carrito</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center justify-between border-t py-2">
            <div className="flex items-center space-x-8">
              {categories.map((category) => (
                <Button key={category.name} variant="ghost" className="flex items-center space-x-2">
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-smooth">Ofertas</button>
              <button className="hover:text-foreground transition-smooth">Novedades</button>
              <button className="hover:text-foreground transition-smooth">Bestsellers</button>
              <button className="hover:text-foreground transition-smooth">Soporte</button>
            </div>
          </nav>

          {/* Mobile Search Bar */}
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10 pr-4 w-full"
                value={state.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {categories.map((category) => (
                  <Button 
                    key={category.name} 
                    variant="ghost" 
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                ))}
                <hr className="my-4" />
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">Ofertas</Button>
                  <Button variant="ghost" className="w-full justify-start">Novedades</Button>
                  <Button variant="ghost" className="w-full justify-start">Bestsellers</Button>
                  <Button variant="ghost" className="w-full justify-start">Mi Cuenta</Button>
                  <Button variant="ghost" className="w-full justify-start">Soporte</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;