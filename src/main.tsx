import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tester from './interface/Tester.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tester />
  </StrictMode>,
)
