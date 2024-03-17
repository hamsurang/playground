import type { Metadata } from 'next'
import '~/styles/reset.css'
import styles from './layout.module.css'

const NOTION_URL =
  'https://hamsurang.notion.site/4ec7716aa5354fc280cac5aa70a2800b'

export const metadata = {
  title: '함수랑피플',
  metadataBase: new URL(NOTION_URL),
  description: '함수랑산악회 멤버를 소개합니다',
  keywords: ['함수랑산악회', '프론트엔드', '함수랑피플'],
  applicationName: '함수랑피플',
  generator: 'Next.js',
} satisfies Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={styles.html} lang="ko">
      <body className={styles.body}>
        <header className={styles.header}>
          <img src="/logo.svg" alt="함수랑산악회 로고" />
        </header>
        {children}
      </body>
    </html>
  )
}
