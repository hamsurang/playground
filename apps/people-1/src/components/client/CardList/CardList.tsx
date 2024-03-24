import { Card } from '../Card/Card'
import styles from './CardList.module.css'
import { profile } from '~/constants/profile'

export const CardList = () => {
  return (
    <ul className={styles['card-list']}>
      {profile.map((user) => (
        <li key={user.name}>
          <Card {...user} />
        </li>
      ))}
    </ul>
  )
}
