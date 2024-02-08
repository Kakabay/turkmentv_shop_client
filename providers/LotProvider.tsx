'use client';

import { LotContext } from '@/context/LotContext';
import { PropsWithChildren, useMemo, useState } from 'react';

const LotProvider = ({ children }: PropsWithChildren) => {
  const [lotNumber, setLotNumber] = useState<string>();
  const LotNumberContext = useMemo(() => ({ lotNumber, setLotNumber }), [lotNumber, setLotNumber]);

  return <LotContext.Provider value={{ LotNumberContext }}>{children}</LotContext.Provider>;
};

export default LotProvider;
