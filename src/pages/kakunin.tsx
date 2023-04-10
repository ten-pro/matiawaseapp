// import Header from '@/components/Header'
// import { Inter } from 'next/font/google'
// import Board from '@/components/map/Board'

// const inter = Inter({ subsets: ['latin'] })

// function Home() {
//   return (
//     <>
//   <Header />
//   <Board />
//      </>
//   )
// }

// export default Home

// ↑↑↑↑↑チャット送信画面↑↑↑↑↑

// import Header from '@/components/Header'
// import { Inter } from 'next/font/google'
// import Chat from '@/components/map/Chat'

// const inter = Inter({ subsets: ['latin'] })

// function Home() {
//   return (
//     <>
//   <Header />
//   <Chat />
//   </>
//   )
// }

// export default Home

// ↑↑↑↑↑予定一覧画面↑↑↑↑↑

import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Reply from '@/components/map/Reply'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <>
  <Header />
  <Reply />
  </>
  )
}

export default Home