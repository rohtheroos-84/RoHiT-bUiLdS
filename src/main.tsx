import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AnimationProvider } from './context/AnimationContext';
import './index.css';

// Update title
document.title = 'Rohit\'s Portfolio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </StrictMode>
);