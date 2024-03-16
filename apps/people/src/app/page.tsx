'use client'

import { useFloating, useHover, useInteractions } from '@floating-ui/react'
import { Box, Flex, Stack } from '@jsxcss/emotion'
import { Reorder, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

type Card = {
  name: string
  imageSrc: string
  description: string
}

const initialCards = [
  {
    name: '웨일',
    imageSrc: 'https://avatars.githubusercontent.com/u/71202076?v=4',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem',
  },
  {
    name: '쏘니',
    imageSrc: 'https://avatars.githubusercontent.com/u/47546413?v=4',
    description:
      'Making it over 2000 years old. Richard McClintock, consectetur, from a Lorem Ipsum passage, and going through',
  },
  {
    name: '민수르',
    imageSrc: 'https://avatars.githubusercontent.com/u/40910757?v=4',
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
  },
  {
    name: '민초당',
    imageSrc: 'https://avatars.githubusercontent.com/u/90169703?v=4',
    description:
      'Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which',
  },
  {
    name: '마누',
    imageSrc: 'https://avatars.githubusercontent.com/u/61593290?v=4',
    description:
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from',
  },
  {
    name: '쿼카',
    imageSrc: 'https://avatars.githubusercontent.com/u/57122180?v=4',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem',
  },
  {
    name: '퉁이리',
    imageSrc: 'https://avatars.githubusercontent.com/u/77133565?v=4',
    description:
      'Looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through',
  },
  {
    name: '모리',
    imageSrc: 'https://avatars.githubusercontent.com/u/89721027?v=4',
    description:
      'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which',
  },
  {
    name: '쉽',
    imageSrc: 'https://avatars.githubusercontent.com/u/43772082?v=4',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem',
  },
] satisfies Card[]

export default function Home() {
  const [cards, setCards] = useState(initialCards)
  const [selectedCardName, setSelectedCardName] = useState<Card['name'] | null>(
    null
  )

  return (
    <Stack
      overflow="hidden"
      backgroundColor="#13120f"
      height="100vh"
      as={motion.div}
      spacing={10}
    >
      <Flex.Center flex={1}>
        <Reorder.Group axis="x" values={cards} onReorder={setCards}>
          <Stack.Horizontal>
            {cards.map((card, cardsIndex, cardsArray) => (
              <Reorder.Item key={card.name} value={card}>
                <Card
                  {...card}
                  selected={selectedCardName === card.name}
                  onTap={() => setSelectedCardName(card.name)}
                  orderFromCenter={cardsIndex - cardsArray.length / 2}
                />
              </Reorder.Item>
            ))}
          </Stack.Horizontal>
        </Reorder.Group>
      </Flex.Center>
    </Stack>
  )
}

const Card = ({
  imageSrc,
  name,
  onTap,
  orderFromCenter,
  description,
}: Card & {
  selected: boolean
  onTap: () => void
  orderFromCenter: number
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
  ])

  useEffect(() => {
    const timeout = setTimeout(() => setIsOpen(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(x, [-100, 100], [15, -15])
  const rotateY = useTransform(y, [-100, 100], [-15, 15])

  const cardSize = { width: 200, height: 280 }
  const shineSize = 400
  const shineX = useTransform(
    x,
    [-100, 100],
    [0 - shineSize / 2, 200 - shineSize / 2]
  )
  const shineY = useTransform(
    y,
    [-100, 100],
    [0 - shineSize / 2, 280 - shineSize / 2]
  )
  const glare1X = useTransform(
    x,
    [-100, 100],
    [0 - cardSize.width / 2, cardSize.width / 2]
  )
  const glare2X = useTransform(
    x,
    [-100, 100],
    [cardSize.width / 2, 0 - cardSize.width / 2]
  )

  return (
    <Box
      {...getReferenceProps({
        ref: refs.setReference,
      })}
      as={motion.div}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + (rect.right - rect.left) / 2
        const centerY = rect.top + (rect.bottom - rect.top) / 2
        x.set(-(centerX - e.pageX))
        y.set(-(centerY - e.pageY))
      }}
      onTap={onTap}
      cursor="pointer"
      initial={{ rotateZ: 0, y: 0 }}
      animate={
        isOpen
          ? { rotateZ: orderFromCenter * 8, y: orderFromCenter * 20 }
          : { rotateZ: 0, y: 0 }
      }
      whileHover={{
        y: -80,
        scale: 2,
        zIndex: 9,
      }}
    >
      <Stack
        position="relative"
        as={motion.div}
        backgroundColor="#4A9BBE"
        borderRadius={10}
        overflow="hidden"
        border="8px solid #debb2f"
        boxSizing="border-box"
        initial={{
          boxShadow: '0 0 30px 10px #00000030',
          marginRight: -60,
          scale: 1,
        }}
        animate={{
          boxShadow: isOpen
            ? '0 0 40px 30px #ffcc002f'
            : '0 0 30px 10px #00000030',
          marginRight: isOpen ? 10 : -60,
          scale: isOpen ? 1.4 : 1,
        }}
        style={{
          ...cardSize,
          rotateX,
          rotateY,
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        padding="8px 8px"
      >
        <Stack spacing={8}>
          <Stack.Horizontal justify="space-between" align="center">
            <Stack.Horizontal spacing={8} align="center">
              <Box
                padding={4}
                borderRadius={8}
                border="2px solid #ffffffb8"
                backgroundColor="#ffffff80"
                fontSize={8}
              >
                Hamsurang
              </Box>
              <Box as="h3" color="#000000" fontSize={16} fontWeight="bold">
                {name}
              </Box>
            </Stack.Horizontal>

            <Stack.Horizontal spacing={6} align="end">
              <Stack.Horizontal
                align="end"
                spacing={4}
                color="#000000"
                fontSize={16}
                fontWeight="bold"
              >
                <Box fontSize={8} as="span">
                  Lv
                </Box>
                <Box fontSize={16} as="span">
                  60
                </Box>
              </Stack.Horizontal>
              <Flex.Center
                width={20}
                height={20}
                overflow="hidden"
                borderRadius="50%"
              >
                <Box
                  as="img"
                  src="https://avatars.githubusercontent.com/u/138272051?s=200&v=4"
                  width="100%"
                  height="100%"
                />
              </Flex.Center>
            </Stack.Horizontal>
          </Stack.Horizontal>

          <Stack>
            <Flex.Center
              overflow="hidden"
              height={120}
              borderTopRightRadius={8}
              borderTopLeftRadius={8}
              borderTop="2px solid #ffffff95"
              borderLeft="2px solid #ffffff95"
              borderRight="2px solid #ffffff95"
            >
              <Box
                as="img"
                src={imageSrc}
                pointerEvents="none"
                opacity={0.8}
                width="100%"
              />
            </Flex.Center>
            <Flex.Center
              border="2px solid #ffffff95"
              backgroundColor="#c7c7c7"
              fontSize={4}
              fontWeight="bold"
              padding={2}
            >
              It is a long established fact that a reader will be distracted
            </Flex.Center>
          </Stack>

          <Stack spacing={4} fontSize={10}>
            <Stack.Horizontal justify="space-between">
              <Box fontWeight="bold">Climber</Box>
              <Box fontWeight="bold">1기</Box>
            </Stack.Horizontal>
            <Box fontSize={9} height={40}>
              {description}
            </Box>
            <Stack.Horizontal
              justify="space-between"
              spacing={8}
              align="center"
            >
              <Stack.Horizontal
                align="center"
                backgroundColor="#ffffff95"
                fontSize={8}
                spacing={8}
                borderRadius={4}
                padding="2px 4px"
              >
                <div>weakness</div>
                <div>resistance</div>
              </Stack.Horizontal>
              <Stack.Horizontal
                backgroundColor="#ffffff95"
                fontSize={6}
                spacing={8}
                align="center"
                padding="2px 4px"
                borderRadius={4}
              >
                <div>weakness</div>
              </Stack.Horizontal>
            </Stack.Horizontal>
            <Stack.Horizontal justify="space-between">
              <Stack.Vertical>
                <Box fontSize={4} fontWeight="bold">
                  Basic
                </Box>
                <Box fontSize={6}>Basic Level</Box>
              </Stack.Vertical>
              <Box fontSize={4} width={100}>
                Looked up one of the more obscure Latin words, consectetur, from
                a Lorem Ipsum passage, and going through
              </Box>
            </Stack.Horizontal>
          </Stack>
        </Stack>

        <Flex.Center
          initial={{ opacity: 0 }}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
          {...getFloatingProps()}
          as={motion.div}
          position="absolute"
          backgroundColor="#ffffff20"
          style={{
            x: shineX,
            y: shineY,
          }}
          width={shineSize}
          height={shineSize}
          borderRadius="100%"
          filter="blur(10px)"
        >
          <Flex.Center
            as={motion.div}
            position="absolute"
            backgroundColor="#ffffff20"
            width={shineSize / 1.5}
            height={shineSize / 1.5}
            borderRadius="100%"
          >
            <Flex.Center
              as={motion.div}
              position="absolute"
              backgroundColor="#ffffff20"
              width={shineSize / 4}
              height={shineSize / 4}
              borderRadius="100%"
            >
              <Flex.Center
                as={motion.div}
                position="absolute"
                backgroundColor="#ffffff70"
                width={shineSize / 8}
                height={shineSize / 8}
                borderRadius="100%"
              />
            </Flex.Center>
          </Flex.Center>
        </Flex.Center>
        <Stack.Horizontal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          position="absolute"
          as={motion.div}
          style={{
            x: glare1X,
            y: 0,
          }}
          spacing={24}
        >
          {[1, 2, 3, 4, 12, 3, 1, 2, 12, 3].map((width, index) => (
            <Box
              key={index}
              backgroundColor="#ffffff20"
              width={width}
              height={shineSize}
              filter="blur(3px)"
            />
          ))}
        </Stack.Horizontal>
        <Stack.Horizontal
          position="absolute"
          as={motion.div}
          style={{
            x: glare2X,
            y: 0,
          }}
          spacing={16}
        >
          {[1, 2, 3, 4, 12, 3, 1, 2, 12, 3].map((width, index) => (
            <Box
              key={index}
              backgroundColor="#ffffff20"
              width={width}
              height={shineSize}
              filter="blur(3px)"
            />
          ))}
        </Stack.Horizontal>
      </Stack>
    </Box>
  )
}
