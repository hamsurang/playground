import styles from './page.module.css'
import { CardList } from '~/components/client'

export default function Home() {
  return (
    <main className={styles.main}>
      <CardList />
    </main>
  )
}
