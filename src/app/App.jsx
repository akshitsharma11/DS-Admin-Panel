import { AppProviders } from './providers/AppProviders.jsx';
import { AppRoutes } from './routes.jsx';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;

