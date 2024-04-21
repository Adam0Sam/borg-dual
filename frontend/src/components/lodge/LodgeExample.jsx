import './lodgeExample.css'
import { useParams } from 'react-router-dom'

export default function LodgeExample() {
	let { taskId } = useParams(); 

	return (
		<div className="center lodge-container">
			<iframe
				height={800}
				width={800}
				src={`http://localhost:3000/lodge1.html?n=${taskId}`}>
			</iframe>
		</div>
	)
}