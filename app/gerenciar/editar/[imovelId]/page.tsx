import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import { EditarClient } from './EditarClient'
import getPropertyById from '@/app/actions/getPropertyById'

interface IParams {
	imovelId?: string
}

const Editar = async ({ params }: { params: IParams }) => {
	const { imovelId } = params

	const currentUser = await getCurrentUser()
	const propertyResult: any = imovelId ? await getPropertyById(imovelId) : null

	if (!currentUser) {
		redirect('/')
	}

	if (currentUser.role !== 'ADMIN') {
		redirect('/')
	}

	return <>{propertyResult && <EditarClient property={propertyResult} />}</>
}

export default Editar
