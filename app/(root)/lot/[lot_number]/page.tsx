"use client";

import Container from "@/components/shared/container";
import LotProvider from "@/providers/LotProvider";
import ShopTable from "@/components/shop/shopTable";

interface IProps {
  params: IParams;
}

interface IParams {
  lot_number: string;
}

const LotNumber = ({ params }: IProps) => {
  return (
    <main className="mt-[100px]">
      <Container>
        <LotProvider>
          <ShopTable params={params.lot_number} />
        </LotProvider>
      </Container>
    </main>
  );
};

export default LotNumber;
