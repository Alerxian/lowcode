// tailwind config is required for editor support
import sharedConfig from '@lowcode/shadcn/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets'> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        './src/**/*.{js,ts,jsx,tsx}',
        '../../../packages/shadcn/src/**/*{.js,.ts,.jsx,.tsx}',
      ],
    },
  ],
}

export default config
