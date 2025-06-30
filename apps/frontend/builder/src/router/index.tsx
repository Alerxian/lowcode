import { Profiler } from 'react'
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
        element: (
          <Profiler
            id="editor"
            onRender={(id, phase, actualDuration) => {
              console.log(id, phase, actualDuration)
            }}
          >
            <Editor />
          </Profiler>
        ),
      },
      {
        path: '/data-source',
        element: (
          <Profiler
            id="datasource"
            onRender={(id, phase, actualDuration) => {
              console.log(id, phase, actualDuration)
            }}
          >
            <DataSource />
          </Profiler>
        ),
      },
    ],
  },
])

export default router
