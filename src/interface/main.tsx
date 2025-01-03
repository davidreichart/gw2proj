import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MatchSelect from "@/components/ex/matchSelect.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MatchSelect></MatchSelect>
  </StrictMode>,
)
