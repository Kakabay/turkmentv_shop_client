'use client';
import Container from '@/components/shared/container';
import ShopTable from '@/components/shop/shopTable';
import { LotContext } from '@/context/LotContext';
import LotProvider from '@/providers/LotProvider';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const LotNumber = ({ params }: { params: string }) => {
  return (
    <main className="mt-[100px]">
      <Container>
        <LotProvider>
          <ShopTable params={params} />
        </LotProvider>
      </Container>
    </main>
  );
};

export default LotNumber;
