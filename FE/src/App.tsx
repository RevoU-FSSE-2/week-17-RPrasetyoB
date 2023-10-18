import { LoginForm, RegisterForm, AddCategory, EditCategory, HomePage, ProfilePage } from './pages'
import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PublicLayout } from './LayOut'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './provider'

const App = () => {
  
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/add',
          element: <AddCategory />
        },
        {
          path: '/edit/:_id',
          element: <EditCategory />
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />
        }
      ]
    },
    {
      element: <LoginForm />,
      path: '/login'
    },
    {
      path: '/register',
      element: <RegisterForm />
    }
  ])


  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
    
  )
}

export default App
