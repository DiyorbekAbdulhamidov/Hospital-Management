import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <MantineProvider
    theme={{
      components: {
        Container: {
          defaultProps: {
            sizes: {
              xs: 540,
              sm: 1200,
              md: 1927,
              lg: 1550,
              xl: 1660
            }
          }
        }
      }
    }}
    withNormalizeCSS
  >
    <AppRoutes />
    <Notifications position="top-right" />
  </MantineProvider>
)