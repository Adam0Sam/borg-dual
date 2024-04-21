import './lodgeExample.css'
import { useParams } from 'react-router-dom'

export default function LodgeExample() {
	let { taskId } = useParams(); 
	console.log(taskId)

	return (
		<div className="center lodge-container">
			<iframe
				height={600}
				width={600}
				src={`http://localhost:3000/lodge1.html?n=${taskId}`}>
			</iframe>
		</div>
	)
}