import React, { useCallback, FC } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImagesUploadProps {
	value: File[]
	onChange: (newValue: File[]) => void
}

const ImagesUpload: FC<ImagesUploadProps> = ({ value, onChange }) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onChange([...value, ...acceptedFiles])
		},
		[value, onChange]
	)

	const removeImage = (indexToRemove: number) => {
		const updatedValue = value.filter((_, index) => index !== indexToRemove)
		onChange(updatedValue)
	}

	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	return (
		<div className='flex flex-col gap-4'>
			<div
				{...getRootProps()}
				className='border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer'>
				<input {...getInputProps()} />
				<p>Arraste e solte imagens aqui ou clique para selecionar.</p>
			</div>
			{value.map((file, index) => (
				<div key={index} className='flex items-center gap-2'>
					<span>{file.name}</span>
					<button onClick={() => removeImage(index)}>Remover</button>
				</div>
			))}
		</div>
	)
}

export default ImagesUpload
