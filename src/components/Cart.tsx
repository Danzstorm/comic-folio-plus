import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEcommerce } from '@/context/EcommerceContext';

const Cart = () => {
  const { state, dispatch } = useEcommerce();

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 35 ? 0 : 4.99;
  const freeShippingThreshold = 35;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  if (!state.isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Carrito de Compra</h2>
              {state.cart.length > 0 && (
                <Badge variant="secondary">
                  {state.cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Free Shipping Progress */}
          {remainingForFreeShipping > 0 && state.cart.length > 0 && (
            <div className="p-4 bg-accent-light/50 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">
                  ¡Añade €{remainingForFreeShipping.toFixed(2)} más para envío GRATIS!
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {state.cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
                <p className="text-muted-foreground mb-6">
                  Descubre nuestra increíble colección de libros, comics y mangas
                </p>
                <Button onClick={closeCart}>
                  Seguir comprando
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.author}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            €{(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {state.cart.length > 0 && (
            <div className="p-6 border-t bg-muted/30">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span className={shipping === 0 ? 'text-success font-medium' : ''}>
                    {shipping === 0 ? 'GRATIS' : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Finalizar Compra
                </Button>
                <Button variant="outline" className="w-full" onClick={closeCart}>
                  Seguir Comprando
                </Button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Pago seguro • Envío en 24-48h • Devoluciones gratuitas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;