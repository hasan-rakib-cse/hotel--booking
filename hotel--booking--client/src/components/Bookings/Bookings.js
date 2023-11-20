import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    // je email dea login korbe se email er data dekhabe
    useEffect(() => {
      fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
        method: 'GET',
        headers: { 
          'Content-type': 'application/json',
          Authorization : `Bearer ${sessionStorage.getItem('token')}` // amra header er moddhe token ta pathea disi
        }
      })
        .then(res => res.json())
        .then(data => setBookings(data))
        setIsLoading(false)
    }, [])
    
    if(isLoading) return <p>Loading...</p>

  return (
    <div>
        <h3>You Have: {bookings.length} booking</h3>
        {
            bookings.map(book => <li key={book._id}>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
        }
    </div>
  )
}

export default Bookings
