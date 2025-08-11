/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setup-tests.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      all: true, // include files even if not hit—limited by `include`
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        '**/__mocks__/**',
        '**/*.d.ts',
        '**/*.stories.{ts,tsx}',
        'node_modules/**',
        'dist/**',
        'vite.config.{ts,js}',
        'vitest.config.{ts,js}',
        '**/*.config.{ts,js}',
      ],
      extension: ['.ts', '.tsx'],
      cleanOnRerun: true,
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
