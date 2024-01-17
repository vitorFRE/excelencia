import getPropertys from '@/app/actions/getPropertys'
import { columns } from './columns'
import { DataTable } from './data-table'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation'

export default async function DemoPage() {
	const currentUser = await getCurrentUser()
	const listings = await getPropertys({})

	if (!currentUser) {
		redirect('/')
	}

	if (currentUser.role !== 'ADMIN') {
		redirect('/')
	}

	return (
		<div className='min-h-screen'>
			<DataTable columns={columns} data={listings} />
		</div>
	)
}
