import './globals.css'

export const metadata = {
  title: '听泉谷 — 失踪',
  description: '18岁生日那天，父母失联了。他们去了一个不存在的地方。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
