'use client'

import { Box, Flex, Stack } from '@jsxcss/emotion'
import { Suspense } from '@suspensive/react'
import { SuspenseImage } from '@suspensive/react-image'
import { Reorder, motion } from 'framer-motion'
import { useState } from 'react'
import { Card, type CardData } from './components/Card'
import StarBackground from './components/StarBackground'
import { initialCards } from '~/mock/cardDatas'

export default function Home() {
  const [cards, setCards] = useState(initialCards)
  const [selectedCardName, setSelectedCardName] = useState<
    CardData['name'] | null
  >(null)

  return (
    <Stack overflow="hidden" height="100vh" as={motion.div} spacing={10}>
      <StarBackground
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="#0b0b09"
      />
      <Flex.Center flex={1}>
        <Suspense clientOnly fallback={null}>
          <Suspense
            clientOnly
            fallback={
              <Flex.Center
                width={320}
                height={320}
                overflow="hidden"
                borderRadius="50%"
              >
                <Box
                  as={SuspenseImage}
                  src="https://avatars.githubusercontent.com/u/138272051?s=200&v=4"
                  width="100%"
                  height="100%"
                />
              </Flex.Center>
            }
          >
            <Reorder.Group axis="x" values={cards} onReorder={setCards}>
              <Stack.Horizontal>
                {cards.map((card, cardsIndex, cardsArray) => (
                  <Reorder.Item key={card.name} value={card}>
                    <Card
                      cardData={card}
                      selected={selectedCardName === card.name}
                      onTap={() => setSelectedCardName(card.name)}
                      orderFromCenter={cardsIndex - cardsArray.length / 2}
                    />
                  </Reorder.Item>
                ))}
              </Stack.Horizontal>
            </Reorder.Group>
          </Suspense>
        </Suspense>
      </Flex.Center>
    </Stack>
  )
}
