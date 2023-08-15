import { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow.src
})

export type LatLng = {
	lat: number
	lng: number
}

type MapWithMarkerProps = {
	onLatLngSelect: (lat: number, lng: number) => void
	initialMarkerPosition: LatLng | null
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({
	onLatLngSelect,
	initialMarkerPosition
}) => {
	const [mapCenter, setMapCenter] = useState<LatLng>(
		initialMarkerPosition || {
			lat: -14.215706,
			lng: -48.442149
		}
	)

	const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null)

	const MapEvents = () => {
		useMapEvents({
			click: (e) => {
				const { lat, lng } = e.latlng
				setMarkerPosition({ lat, lng })
				onLatLngSelect(lat, lng)

				setMapCenter({ lat, lng })
			}
		})
		return null
	}

	return (
		<MapContainer
			center={[mapCenter.lat, mapCenter.lng]}
			zoom={14}
			scrollWheelZoom={true}
			className='h-[35vh] rounded-lg'>
			<MapEvents />
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{initialMarkerPosition && (
				<Marker position={[initialMarkerPosition.lat, initialMarkerPosition.lng]} />
			)}
		</MapContainer>
	)
}

export default MapWithMarker
