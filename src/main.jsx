import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

// You can store your Clerk publishable key in an environment variable; here we default to a placeholder.
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'your-publishable-key-here'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  </StrictMode>,
)
