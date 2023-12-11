import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import { EditarClient } from './EditarClient'
import getPropertyById from '@/app/actions/getPropertyById'
import { Property } from '@/app/actions/getPropertys'

const Editar = async () => {
	const currentUser = await getCurrentUser()
	const propertyResult: any = await getPropertyById('clpmy5syi0007ulncvbsswnww')

	if (!currentUser) {
		redirect('/')
	}

	if (currentUser.role !== 'ADMIN') {
		redirect('/')
	}

	return <>{propertyResult && <EditarClient property={propertyResult} />}</>
}

export default Editar
