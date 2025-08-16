import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { PlaceholderComponent } from "../components/PlaceholderComponent";
import { RootLayout } from "../components/RootLayout";

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
        element: <PlaceholderComponent appName={app.name} />,
      })),
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />
}