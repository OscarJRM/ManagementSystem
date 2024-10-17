import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome to Order Management System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-center">
              Select an option from the menu on the left to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}