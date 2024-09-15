import React, { StrictMode } from 'react';
import {createRoot, Root} from 'react-dom/client';
import './styles.css';

import App from './App.tsx';

const root: Root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
