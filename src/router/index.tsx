import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { RootLayout } from "../components/RootLayout";
import { TodoList } from "../pages/TodoList";
import { ImageDetail } from "../pages/ImageDetail";
import { Gallery } from "../pages/Gallery";
import { LocalImageDetail } from "../pages/LocalImageDetail";

export const applicationsData = [
  {
    name: 'Lista de tarefas',
    path: '/lista-de-tarefas',
    element: <TodoList />
  },
  {
    name: 'Galeria de Imagens',
    path: '/galeria-de-imagens',
    element: <Gallery />,
  },
  {
    name: 'Dashboard de Tarefas',
    path: '/dashboard',
    element: <Dashboard />
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
        element: app.element,
      })),
      {
        path: '/galeria-de-imagens/:id',
        element: <ImageDetail />,
      },
      {
        path: '/minhas-fotos/:id', // Rota para detalhes da foto local
        element: <LocalImageDetail />,
      },
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />
}