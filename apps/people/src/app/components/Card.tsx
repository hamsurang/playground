'use client'

import {
  FloatingArrow,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { Box, Flex, Stack } from '@jsxcss/emotion'
import { SuspenseImage } from '@suspensive/react-image'
import {
  type MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import {
  type ReactElement,
  cloneElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const hologramVerticals = [1, 2, 3, 4, 12, 3, 1, 2, 12, 3] as const

const IsOpenContext = createContext(true)

export type CardData = {
  name: string
  imageSrc: string
  description: string
  githubUsername: string
}

export const Card = ({
  cardData,
  onTap,
  orderFromCenter,
}: {
  cardData: CardData
  selected: boolean
  onTap: () => void
  orderFromCenter: number
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isHoverCard, setIsHoverCard] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => setIsOpen(false),
      1000 + orderFromCenter * 30
    )
    return () => clearTimeout(timeout)
  }, [orderFromCenter])

  const mouseXFromCardCenter = useMotionValue(0)
  const mouseYFromCardCenter = useMotionValue(0)
  const rotateX = useTransform(mouseXFromCardCenter, [-100, 100], [15, -15])
  const rotateY = useTransform(mouseYFromCardCenter, [-100, 100], [-15, 15])

  const cardSize = { width: 5 * 40, height: 7 * 40 }
  const shineSize = 400

  return (
    <IsOpenContext.Provider value={isOpen}>
      <Stack
        onHoverStart={() => setIsHoverCard(true)}
        onHoverEnd={() => setIsHoverCard(false)}
        onTap={onTap}
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
          rotateZ: 0,
          y: 0,
          scale: 0.6,
        }}
        animate={{
          boxShadow: isOpen
            ? '0 0 40px 30px #ffcc002f'
            : '0 0 30px 10px #00000030',
          marginRight: isOpen ? 0 : -60,
          scale: isOpen ? 1.4 : 1,
          rotateZ: isOpen ? orderFromCenter * 6 : 0,
          y: isOpen ? Math.abs(orderFromCenter) * 20 + -100 : 0,
        }}
        whileHover={{
          rotateZ: orderFromCenter * 8,
          y: -80,
          zIndex: 90,
          boxShadow: '0 0 40px 30px #ffcc002f',
          scale: 2.8,
        }}
        style={{
          ...cardSize,
          rotateX,
          rotateY,
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const centerX = rect.left + (rect.right - rect.left) / 2
          const centerY = rect.top + (rect.bottom - rect.top) / 2
          mouseXFromCardCenter.set(-(centerX - e.pageX))
          mouseYFromCardCenter.set(-(centerY - e.pageY))
        }}
        onMouseLeave={() => {
          mouseXFromCardCenter.set(0)
          mouseYFromCardCenter.set(0)
        }}
        padding="8px 8px"
      >
        <Stack spacing={8}>
          <Stack.Horizontal justify="space-between" align="center">
            <Stack.Horizontal spacing={8} align="center">
              <Flex.Center
                padding={4}
                borderRadius={8}
                border="2px solid #ffffffb8"
                backgroundColor="#ffffff80"
                fontSize={8}
                fontWeight={700}
              >
                함수랑
              </Flex.Center>
              <Box as="h3" color="#000000" fontSize={16} fontWeight="bold">
                {cardData.name}몬
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
                as={motion.a}
                href="https://github.com/hamsurang"
                whileHover={{ scale: 1.12 }}
                width={20}
                height={20}
                overflow="hidden"
                borderRadius="50%"
                cursor="pointer"
              >
                <Box
                  as={SuspenseImage}
                  src="https://avatars.githubusercontent.com/u/138272051?s=200&v=4"
                  width="100%"
                  height="100%"
                />
              </Flex.Center>
            </Stack.Horizontal>
          </Stack.Horizontal>

          <Stack
            as={motion.a}
            href={`https://github.com/${cardData.githubUsername}`}
            whileHover={{ scale: 1.04 }}
            cursor="pointer"
          >
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
                as={SuspenseImage}
                src={cardData.imageSrc}
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
              color="black"
            >
              GitHub 프로필({cardData.githubUsername})로 연결됩니다.
            </Flex.Center>
          </Stack>

          <Stack spacing={2} fontSize={10}>
            <Stack.Horizontal justify="space-between">
              <Box fontWeight="bold">Climber</Box>
              <Box fontWeight="bold">1기</Box>
            </Stack.Horizontal>
            <Box fontSize={8} lineHeight={1.6} height={38}>
              {cardData.description}
            </Box>
          </Stack>

          <Stack spacing={4}>
            <Stack.Horizontal
              justify="space-between"
              spacing={8}
              align="center"
            >
              <Stack.Horizontal
                align="center"
                backgroundColor="#ffffff95"
                fontSize={6}
                spacing={8}
                borderRadius={4}
                padding="2px 4px"
              >
                <div>weakness</div>
                <div>resistance</div>
              </Stack.Horizontal>
              <Stack.Horizontal
                backgroundColor="#ffffff95"
                fontSize={4}
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

        <Shine
          size={shineSize}
          mouseXFromCardCenter={mouseXFromCardCenter}
          mouseYFromCardCenter={mouseYFromCardCenter}
          enabled={isHoverCard || isOpen}
        />
        <HologramVertical
          cardSize={cardSize}
          mouseXFromCardCenter={mouseXFromCardCenter}
        />
      </Stack>
    </IsOpenContext.Provider>
  )
}

const HologramVertical = ({
  cardSize,
  mouseXFromCardCenter,
}: {
  cardSize: { width: number; height: number }
  mouseXFromCardCenter: MotionValue<number>
}) => {
  const glare1X = useTransform(
    mouseXFromCardCenter,
    [-100, 100],
    [0 - cardSize.width / 2, cardSize.width / 2]
  )
  const glare2X = useTransform(
    mouseXFromCardCenter,
    [-100, 100],
    [cardSize.width / 2, 0 - cardSize.width / 2]
  )

  return (
    <>
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
        pointerEvents="none"
      >
        {hologramVerticals.map((width, index) => (
          <Box
            key={index}
            backgroundColor="#ffffff20"
            width={width}
            height={cardSize.height}
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
        pointerEvents="none"
      >
        {hologramVerticals.map((width, index) => (
          <Box
            key={index}
            backgroundColor="#ffffff20"
            width={width}
            height={cardSize.height}
            filter="blur(3px)"
          />
        ))}
      </Stack.Horizontal>
    </>
  )
}

const Shine = ({
  mouseXFromCardCenter,
  mouseYFromCardCenter,
  size,
  enabled,
}: {
  mouseXFromCardCenter: MotionValue<number>
  mouseYFromCardCenter: MotionValue<number>
  size: number
  enabled: boolean
}) => {
  return (
    <Flex.Center
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: enabled ? 1 : 0 }}
      style={{
        borderRadius: '100%',
        width: size,
        height: size,
        backgroundColor: '#ffffff20',
        position: 'absolute',
        x: useTransform(
          mouseXFromCardCenter,
          [-100, 100],
          [0 - size / 2, 200 - size / 2]
        ),
        y: useTransform(
          mouseYFromCardCenter,
          [-100, 100],
          [0 - size / 2, 280 - size / 2]
        ),
        filter: 'blur(10px)',
      }}
      pointerEvents="none"
    >
      <Flex.Center
        as={motion.div}
        position="absolute"
        backgroundColor="#ffffff20"
        width={size / 1.5}
        height={size / 1.5}
        borderRadius="100%"
      >
        <Flex.Center
          as={motion.div}
          position="absolute"
          backgroundColor="#ffffff20"
          width={size / 4}
          height={size / 4}
          borderRadius="100%"
        >
          <Flex.Center
            as={motion.div}
            position="absolute"
            backgroundColor="#ffffff70"
            width={size / 8}
            height={size / 8}
            borderRadius="100%"
          />
        </Flex.Center>
      </Flex.Center>
    </Flex.Center>
  )
}

export const Tooltip = ({ children }: { children: ReactElement }) => {
  const tooltip = useDisclosure({
    initialState: true,
  })
  const tooltipArrowRef = useRef(null)
  const tooltipFloating = useFloating({
    open: tooltip.isOpen,
    onOpenChange: (open) => (open ? tooltip.open() : tooltip.close()),
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({ element: tooltipArrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const tooltipInteractions = useInteractions([
    useRole(tooltipFloating.context, { role: 'tooltip' }),
  ])
  return (
    <>
      {cloneElement(
        children,
        tooltipInteractions.getReferenceProps({
          ref: tooltipFloating.refs.setReference,
        })
      )}
      <div
        {...tooltipInteractions.getFloatingProps({
          ref: tooltipFloating.refs.setFloating,
          style: tooltipFloating.floatingStyles,
        })}
      >
        hihihi
        <FloatingArrow
          ref={tooltipArrowRef}
          context={tooltipFloating.context}
        />
      </div>
    </>
  )
}

export const useDisclosure = (options: {
  initialState?: boolean
  onOpen?: () => void
  onClose?: () => void
}) => {
  const { initialState = false, onOpen, onClose } = options

  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const open = () => {
    setIsOpen(true)

    return onOpen?.()
  }

  const close = () => {
    setIsOpen(false)

    return onClose?.()
  }

  const toggle = () => (isOpen ? close() : open())

  return { isOpen, open, close, toggle }
}
