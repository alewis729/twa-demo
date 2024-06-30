import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

import { useCounterContract, useTonConnect } from './hooks';
import { isNil } from './utils';
import './App.css';

const App: React.FC = () => {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

  React.useEffect(() => {
    console.log({ mstatus: 'value update', value });
  }, [value]);

  return (
    <div className="m">
      <div className="Container">
        <TonConnectButton className="TonButton" />
        <div className="Card">
          <b>Counter Contract Address:</b>
          <div className="Hint">
            {address?.slice(0, 8) +
              '...' +
              address?.substring((address?.length ?? 6) - 6)}
          </div>
        </div>
        <div className="Card">
          <b>Counter Value:</b>
          <p>
            {isNil(value) ? (
              <>Loading...</>
            ) : (
              <>{(value as number).toLocaleString()}</>
            )}
          </p>
        </div>
        <button
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={sendIncrement}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default App;
