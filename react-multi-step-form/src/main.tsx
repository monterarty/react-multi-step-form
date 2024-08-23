import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MultiStepForm from './components/MultiStepForm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiStepForm />
  </StrictMode>
);
