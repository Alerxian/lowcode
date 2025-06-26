import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/layout'
import DataSource from '@/pages/DataSource'
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
      {
        path: '/data-source',
        element: <DataSource />,
      },
    ],
  },
])

export default router
