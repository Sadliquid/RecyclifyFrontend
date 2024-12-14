import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import "@fontsource/sora";
import "@fontsource/lilita-one";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Lilita One', sans-serif` },
        body: { value: `'Sora', sans-serif` },
      },
    },
  },
})

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}