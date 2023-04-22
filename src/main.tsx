import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Entry } from './entry';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <Entry/>
);
