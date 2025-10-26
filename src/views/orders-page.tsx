'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import { meals } from '@/models/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Meal } from '@/models/types';
import { useToast } from '@/hooks/use-toast';


type CartItem = Meal & { quantity: number };

const initialCartItems: CartItem[] = [
  { ...meals[0], quantity: 1 },
  { ...meals[1], quantity: 2 },
];

const recentOrders = [
  { id: 'ORD001', date: '2023-10-26', total: 45.5, status: 'Delivered' },
  { id: 'ORD002', date: '2023-10-28', total: 22.0, status: 'In Transit' },
];

export default function OrdersPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { toast } = useToast();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };
  
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Your cart is empty",
        description: "Please add items to your cart before placing an order.",
      });
      return;
    }
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We've received it and will start preparing it shortly.",
    });
    setCartItems([]);
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.calories * 0.1 * item.quantity, 0);
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">My Cart &amp; Orders</h1>

        {/* Current Cart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" /> Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length > 0 ? (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const image = PlaceHolderImages.find((img) => img.id === item.imageId);
                    return (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${(item.calories * 0.1).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-6" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            ) : (
               <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-2 rounded-lg hover:bg-muted"
              >
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-primary">{order.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Checkout Form */}
      <div className="lg:col-span-1">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your order.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input id="address" placeholder="123 Health St, Fitness City" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="payment" placeholder="Card Number" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo">Promo Code</Label>
              <Input id="promo" placeholder="Enter code" />
            </div>
            <Button className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
