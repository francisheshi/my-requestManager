import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddRequest from "./components/AddRequest";
import Requests from "./components/Requests";

const App = () => {
  const [showAddRequest, setShowAddRequest] = useState(false)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const getRequests = async () => {
      const requestsFromServer = await fetchRequests()
      setRequests(requestsFromServer)
    }

    getRequests()
  }, [])

  // Fetch Requests
  const fetchRequests = async () => {
    const res = await fetch('http://localhost:3000/requests')
    const data = await res.json()

    return data
  }

  // Fetch Request
  const fetchRequest = async (id) => {
    const res = await fetch(`http://localhost:3000/requests/${id}`)
    const data = await res.json()

    return data
  }

  // Add Request
  const addRequest = async (request) => {
    const res = await fetch('http://localhost:3000/requests', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await res.json()

    setRequests([...requests, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newRequest = { id, ...request }
    // setRequests([...requests, newRequest])
  }

  // Delete Request
  const deleteRequest = async (id) => {
    const res = await fetch(`http://localhost:3000/requests/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setRequests(requests.filter((request) => request.id !== id))
      : alert('Error Deleting This Request')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const requestToToggle = await fetchRequest(id)
    const updRequest = { ...requestToToggle, reminder: !requestToToggle.reminder }

    const res = await fetch(`http://localhost:3000/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updRequest),
    })

    const data = await res.json()

    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, reminder: data.reminder } : request
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddRequest(!showAddRequest)}
          showAdd={showAddRequest}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddRequest && <AddRequest onAdd={addRequest} />}
              {requests.length > 0 ? (
                <Requests
                  requests={requests}
                  onDelete={deleteRequest}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Requests created To Show'
              )}
            </>
          )}
        />
        <Footer />
      </div>
    </Router>
  )
}

export default App