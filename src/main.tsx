import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import App from './App';
import './index.css';

let MANIFEST_URL = `${window.location.origin}/twa-demo/tonconnect-manifest.json`;

if (window.location.hostname === 'localhost') {
  MANIFEST_URL = `http://localhost:5173/twa-demo/tonconnect-local-manifest.json`;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
    <App />
  </TonConnectUIProvider>
);
