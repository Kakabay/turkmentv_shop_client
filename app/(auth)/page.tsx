'use client';
import Input from '@/components/auth/input';
import LoginForm from '@/components/auth/loginForm';
import Container from '@/components/shared/container';
import LotProvider from '@/providers/LotProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <main className="min-h-screen py-6 flex items-center justify-center">
      <Container>
        <div className="flex justify-center items-center">
          <LotProvider>
            <QueryClientProvider client={queryClient}>
              <LoginForm label="Öz koduňyzy giriziň" />
            </QueryClientProvider>
          </LotProvider>
        </div>
      </Container>
    </main>
  );
}
