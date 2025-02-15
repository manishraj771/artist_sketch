import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      let query = supabase.from('orders').select('*');
      
      if (userId) {
        query = query.eq('customer_id', userId);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data as Order[]);
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return { orders, loading, updateOrderStatus };
}