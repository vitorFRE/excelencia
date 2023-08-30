'use client'

import { MapContainer, CircleMarker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapWithLocationProps = {
	lat: number
	lng: number
}

const MapWithLocation: React.FC<MapWithLocationProps> = ({ lat, lng }) => {
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={14}
			scrollWheelZoom={false}
			className='h-[45vh] rounded-lg'>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<CircleMarker
				center={[lat, lng]}
				radius={100}
				fillColor='blue'
				fillOpacity={0.6}
				color='blue'
				weight={2}
			/>
		</MapContainer>
	)
}

export default MapWithLocation
