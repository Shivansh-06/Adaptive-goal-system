import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import GoalDetail from '../pages/goal/GoalDetail';
import ProgressEntry from '../pages/progress/ProgressEntry';
import ProtectedRoute from '../components/layout/ProtectedRoute'; // Placeholder, to be implemented
import AppLayout from '../components/layout/AppLayout'; // Placeholder

export const router = createBrowserRouter([
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/auth/register',
        element: <Register />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'goals/:id',
                element: <GoalDetail />,
            },
            {
                path: 'progress',
                element: <ProgressEntry />,
            },
            {
                path: '', // Redirect to dashboard
                element: <Dashboard />, // simplified
            }
        ],
    },
]);
