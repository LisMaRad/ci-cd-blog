import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	use: {
		baseURL: process.env.TEST_BASE_URL,
	},
	testDir: 'tests',
}

export default config
