import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/layout'
import Editor from '@/views/Editor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Editor />,
      },
    ],
  },
])

export default router
