import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import RegisterModal from '../components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from '../components/modals/LoginModal'
import AddPropertyModal from '../components/modals/AddPropertyModal'
import Footer from '../components/footer/Footer'
import 'swiper/css'
import 'swiper/css/pagination'
import { ThemeProvider } from './providers/theme-provider'
import Navbar from '@/components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Excelencia - Imobiliaria',
	description:
		'Bem-vindo à Excelencia - Sua imobiliária fictícia de confiança. Encontre as melhores propriedades em nossa vasta seleção de casas, apartamentos e investimentos imobiliários.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()

	return (
		<html
			suppressHydrationWarning
			lang='pt-br'
			style={{ colorScheme: 'dark' }}
			className={`dark`}>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='dark'>
					<ToasterProvider />
					<AddPropertyModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
					<div className='pb-20'>{children}</div>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
