"use client"

import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function SettingsPage() {
  const [defaultProfit, setDefaultProfit] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: `Default profit per order set to $${defaultProfit}`,
    });
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">Settings</h2>
      <div className="max-w-md">
        <div className="mb-4">
          <Label htmlFor="defaultProfit">Default Profit per Order</Label>
          <Input
            id="defaultProfit"
            type="number"
            value={defaultProfit}
            onChange={(e) => setDefaultProfit(e.target.value)}
            placeholder="Enter default profit amount"
          />
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </Layout>
  );
}