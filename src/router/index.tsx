import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { PlaceholderComponent } from "../components/PlaceholderComponent";
import { RootLayout } from "../components/RootLayout";
import { TodoList } from "../pages/TodoList";

export const applicationsData = [
  {
    name: 'Lista de tarefas',
    path: '/lista-de-tarefas',
  },
  {
    name: 'Galeria de Imagens',
    path: '/galeria-de-imagens',
  },
  {
    name: 'Dashboard de Tarefas',
    path: '/dashboard',
  },
];


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      ...applicationsData.map(app => ({
        path: app.path,
        element: app.path === '/dashboard' 
          ? <Dashboard /> 
          : app.path === '/lista-de-tarefas' ?
            <TodoList />
          : <PlaceholderComponent appName={app.name} />,
      })),
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />
}