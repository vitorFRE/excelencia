import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import AdicionarClient from './AdicionarClient'

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		redirect('/')
	}

	if (currentUser.role !== 'ADMIN') {
		redirect('/')
	}

	return (
		<>
			<AdicionarClient />
		</>
	)
}

export default FavoritesPage
