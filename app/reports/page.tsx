"use client"

import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2023-01-01', orders: 5, revenue: 500 },
  { date: '2023-01-02', orders: 7, revenue: 700 },
  { date: '2023-01-03', orders: 3, revenue: 300 },
  { date: '2023-01-04', orders: 8, revenue: 800 },
  { date: '2023-01-05', orders: 6, revenue: 600 },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('deliveries');

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">Reports</h2>
      <div className="mb-4">
        <Select onValueChange={setReportType} defaultValue={reportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deliveries">Deliveries</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>{reportType === 'deliveries' ? 'Total Deliveries' : 'Total Revenue'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {reportType === 'deliveries'
                ? mockData.reduce((sum, day) => sum + day.orders, 0)
                : `$${mockData.reduce((sum, day) => sum + day.revenue, 0)}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {reportType === 'deliveries'
                ? (mockData.reduce((sum, day) => sum + day.orders, 0) / mockData.length).toFixed(2)
                : `$${(mockData.reduce((sum, day) => sum + day.revenue, 0) / mockData.length).toFixed(2)}`}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{reportType === 'deliveries' ? 'Deliveries by Date' : 'Revenue by Date'}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={reportType === 'deliveries' ? 'orders' : 'revenue'} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Layout>
  );
}