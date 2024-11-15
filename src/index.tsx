import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Onboarding from './onboarding/index.tsx'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Onboarding />
  </React.StrictMode>
)
