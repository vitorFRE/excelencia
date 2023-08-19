import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				primary: '#004AAD',
				cBorder: 'rgba(0, 0, 0, 0.15)',
				testea:
					'linear-gradient(148deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.10) 100%);'
			},
			backgroundImage: {
				'hero-bg': "url('/images/BG.jpg')"
			}
		}
	},
	plugins: []
}
export default config
