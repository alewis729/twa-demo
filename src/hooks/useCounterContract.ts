import { useEffect, useState } from 'react';
import { Address, OpenedContract } from '@ton/core';

import Counter from '../contracts/counter';
import { useAsyncInitialize, useTonClient, useTonConnect } from './index';

export const useCounterContract = () => {
  const client = useTonClient();
  const [value, setValue] = useState<null | number>(null);
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse(import.meta.env.VITE_DEPLOYED_COUNTER_CONTRACT_ADDRESS)
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      console.log({ mstatus: 'Checking for value change...' });
      const val = await counterContract.getCounter();
      if (Number(val) !== value) {
        setValue(Number(val));
      }
      await sleep(3000); // sleep 3 seconds and poll value again
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value,
    address: counterContract?.address.toString(),
    sendIncrement: () => counterContract?.sendIncrement(sender)
  };
};
