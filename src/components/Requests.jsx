import Request from './Request';

const Requests = ({ requests }) => {
    return (
        <>
            {requests.map(request => {
                return <Request
                                key = {request.id}
                                request = {request} />
            })}
        </>
     );
}
 
export default Requests;