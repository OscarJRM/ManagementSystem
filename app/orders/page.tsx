"use client"

import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('Your order {orderId} status has been updated.');
  const { toast } = useToast();

  const handleAddOrder = () => {
    if (orderId && customerName) {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      setOrders([...orders, { 
        id: orderId, 
        customerName, 
        phoneNumber: formattedPhoneNumber,
        status: 'pending', 
        createdAt: new Date().toISOString() 
      }]);
      setOrderId('');
      setCustomerName('');
      setPhoneNumber('');
      toast({
        title: "Order Added",
        description: `Order ${orderId} for ${customerName} has been added successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Order ID and Customer Name are required.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus, deliveredAt: newStatus === 'delivered' ? new Date().toISOString() : null } : order
    ));
  };

  const handleWhatsApp = (phoneNumber, orderId) => {
    if (phoneNumber) {
      const message = whatsappMessage.replace('{orderId}', orderId);
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      toast({
        title: "Error",
        description: "No phone number available for this order.",
        variant: "destructive",
      });
    }
  };

  const formatPhoneNumber = (number) => {
    // Remove any non-digit characters from the input
    const cleanNumber = number.replace(/\D/g, '');
    // Check if the number already starts with +593
    if (cleanNumber.startsWith('593')) {
      return '+' + cleanNumber;
    }
    // If the number starts with 0, remove it and add +593
    if (cleanNumber.startsWith('0')) {
      return '+593' + cleanNumber.slice(1);
    }
    // Otherwise, just add +593 to the beginning
    return '+593' + cleanNumber;
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">Manage Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Enter Order ID or Scan Barcode"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            +593
          </span>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded-l-none"
          />
        </div>
      </div>
      <Button onClick={handleAddOrder} className="mb-4">Add Order</Button>
      <div className="mb-4">
        <label htmlFor="whatsappMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Customize WhatsApp Message
        </label>
        <Textarea
          id="whatsappMessage"
          placeholder="Enter custom message. Use {orderId} for the order ID."
          value={whatsappMessage}
          onChange={(e) => setWhatsappMessage(e.target.value)}
          className="w-full"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Delivered At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : '-'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleStatusChange(order.id, order.status === 'pending' ? 'delivered' : 'pending')}
                >
                  {order.status === 'pending' ? 'Mark Delivered' : 'Mark Pending'}
                </Button>
                <Button variant="outline" onClick={() => handleWhatsApp(order.phoneNumber, order.id)}>
                  WhatsApp
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}