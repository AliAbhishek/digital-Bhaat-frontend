
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './redux/Store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Toaster />
      <App />

    </Provider>
    </QueryClientProvider>
  </>

)
