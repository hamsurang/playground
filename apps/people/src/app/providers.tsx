'use client'

import { Global, ThemeProvider } from '@emotion/react'
import { MediaQueryProvider } from '@jsxcss/emotion'
import { type ReactNode } from 'react'
import { resetCss, theme } from '~/styles'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={resetCss} />
      <MediaQueryProvider>{children}</MediaQueryProvider>
    </ThemeProvider>
  )
}
