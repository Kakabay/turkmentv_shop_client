'use client';
import Input from '@/components/auth/input';
import LoginForm from '@/components/auth/loginForm';
import Container from '@/components/shared/container';

export default function Home() {
  return (
    <main className="h-screen py-6 flex items-center justify-center">
      <Container>
        <div className="flex justify-center items-center">
          <LoginForm label="Авторизация" buttonLink="lot_list/d6fd78df" />
        </div>
      </Container>
    </main>
  );
}
