import { Provider } from 'react-redux'

import { AppProvider } from './providers'

import { store } from './stores'
import MainLayout from './components/MainLayout'

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <AppProvider />
      </MainLayout>
    </Provider>
  )
}

export default App
