import { FaTimes } from 'react-icons/fa';

const Request = ({ request, onDelete }) => {
    return ( 
        <div className="requests">
            <h3>{request.id}
            <FaTimes style={{ color: "red", cursor: "pointer" }} onClick={() => onDelete(request.id)} /></h3>
            <p>{request.areaOfInterest}</p>
            <p>{request.status}</p>
            <p>{request.startDate}</p>
            <p>{request.endDate}</p>
        </div>
     );
}
 
export default Request;