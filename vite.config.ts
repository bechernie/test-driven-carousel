import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // @ts-expect-error test is missing from the type definition
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['test-setup.ts'],
    },
})
