import React, { useRef } from 'react'
import styles from './Card.module.css'

interface CardProps {
  name: string
  imageSrc: string
  description: string
}

export const Card = ({ name, imageSrc, description }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    cardRef.current.style.transform = `rotateY(${x * 45}deg) rotateX(${-y * 45}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  const handleClick = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <figure
      className={styles.card}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      tabIndex={0}
      aria-label={`Card for ${name}`}
    >
      <h3>{name}</h3>
      <img src={imageSrc} alt={name} />
      <figcaption>{description}</figcaption>
      <div className={styles.shine} />
      <div className={styles.glare} />
    </figure>
  )
}
