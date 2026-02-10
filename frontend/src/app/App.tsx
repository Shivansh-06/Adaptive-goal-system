import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { router } from './routes';
import { QueryProvider } from './providers/QueryProvider';
import '../index.css';

function App() {
    return (
        <Provider store={store}>
            <QueryProvider>
                <RouterProvider router={router} />
            </QueryProvider>
        </Provider>
    );
}

export default App;
