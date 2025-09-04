import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Product {
  id: string;
  title: string;
  author: string;
  category: 'book' | 'comic' | 'manga';
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isbn?: string;
  pages?: number;
  publisher: string;
  language: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface EcommerceState {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  isCartOpen: boolean;
  searchTerm: string;
  filters: {
    category: string[];
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
    onSale: boolean;
  };
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
}

type EcommerceAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<EcommerceState['filters']> }
  | { type: 'SET_SORT_BY'; payload: EcommerceState['sortBy'] }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<EcommerceState> };

const initialState: EcommerceState = {
  products: [],
  cart: [],
  wishlist: [],
  user: null,
  isCartOpen: false,
  searchTerm: '',
  filters: {
    category: [],
    priceRange: [0, 100],
    rating: 0,
    inStock: true,
    onSale: false,
  },
  sortBy: 'popular',
};

const ecommerceReducer = (state: EcommerceState, action: EcommerceAction): EcommerceState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.stock)) }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };

    case 'LOAD_PERSISTED_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const EcommerceContext = createContext<{
  state: EcommerceState;
  dispatch: React.Dispatch<EcommerceAction>;
} | null>(null);

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    const persistedCart = localStorage.getItem('bookstore-cart');
    const persistedWishlist = localStorage.getItem('bookstore-wishlist');
    const persistedUser = localStorage.getItem('bookstore-user');

    if (persistedCart || persistedWishlist || persistedUser) {
      dispatch({
        type: 'LOAD_PERSISTED_STATE',
        payload: {
          cart: persistedCart ? JSON.parse(persistedCart) : [],
          wishlist: persistedWishlist ? JSON.parse(persistedWishlist) : [],
          user: persistedUser ? JSON.parse(persistedUser) : null,
        },
      });
    }
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('bookstore-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('bookstore-wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('bookstore-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('bookstore-user');
    }
  }, [state.user]);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};