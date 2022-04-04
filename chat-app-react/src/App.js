import './App.css';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from 'react-query';

import store from './store/store';

import ToggleSwitch from './components/ToggleSwitch';
import MessagesList from './components/MessagesList';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <ToggleSwitch />
          <MessagesList />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
