import Container from '@/components/shared/container';
import LotList from '@/components/shop/lotList';
import ShopTable from '@/components/shop/shopTable';
import React from 'react';

const page = () => {
  return (
    <main className="mt-[100px]">
      <Container>
        <LotList />
      </Container>
    </main>
  );
};

export default page;
