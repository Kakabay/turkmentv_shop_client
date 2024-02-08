'use client';
import Input from '@/components/auth/input';
import LoginForm from '@/components/auth/loginForm';
import Container from '@/components/shared/container';
import LotProvider from '@/providers/LotProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  return (
    <main className="min-h-screen py-6 flex items-center justify-center">
      <Container>
        <div className="flex justify-center items-center">
          <LotProvider>
            <LoginForm label="Öz koduňyzy giriziň" />
          </LotProvider>
        </div>
      </Container>
    </main>
  );
}
