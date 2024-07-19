// import React, { useState, useContext, useEffect } from 'react';
// import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
// import '../styles/myprofile.css';
// import avatar from '../assets/images/avatar.jpg';
// import { AuthContext } from '../context/AuthContext';
// import { BASE_URL } from './../utils/config';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// const Dashboard = () => {
//   const { user, dispatch } = useContext(AuthContext);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [myBookings, setMyBookings] = useState([]);
//   const [edit, setEdit] = useState({ ...user });
//   const [view, setView] = useState(false);
//   const [tab, setTab] = useState('bookings');
//   const token = cookies.get('token');
// console.log(token)
//   useEffect(() => {
//     if (view) {
//       fetchBookings();
//     }
//   }, [view]);

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/booking/get/${user.bookings}`, {
//         method: 'GET',
//         headers: {
//           'content-type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       // console.log(response +"kash")

//       if (response.ok) {
//         const bookingData = await response.json();
//         setMyBookings(bookingData);
//       } else {
//         console.error('Error fetching bookings:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   const handleChangeProfile = (e) => {
//     const { name, value } = e.target;
//     setEdit({ ...edit, [name]: value });
//   };

//   const handleSubmitProfile = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}/user/update/${user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(edit),
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         dispatch({ type: 'UPDATE_USER', payload: updatedUser });
//         setEditingProfile(false);
//       } else {
//         const errorData = await response.json();
//         console.error('Error updating profile:', errorData);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleToggleEditing = () => {
//     setEditingProfile(!editingProfile);
//   };

//   const handleViewBookings = () => {
//     setView(!view);
//   };

//   return (
//     <div>
//       <Container className="dashboard-container">
//         <Row>
//           <Col md={4}>
//             <Card className="profile-card">
//               <CardBody>
//                 <img src={avatar} alt="" />
//                 <p><strong>Name:</strong> {user.username}</p>
//                 <p><strong>Role:</strong> {user.role}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <Button onClick={() => setTab("settings")} className='btn primary_btn'>{editingProfile ? 'Cancel' : 'Edit Profile'}</Button>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md={8}>
//             {editingProfile ? (
//               <Card className="profile-card">
//                 <CardBody>
//                   <h3>Edit Profile</h3>
//                   <Form onSubmit={handleSubmitProfile}>
//                     <FormGroup>
//                       <Label for="name" className='label'>Name</Label>
//                       <Input type="text" name="name" id="name" value={edit.username} onChange={handleChangeProfile} />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label for="email" className='label'>Email</Label>
//                       <Input type="email" name="email" id="email" value={edit.email} onChange={handleChangeProfile} />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label for="password" className='label'>Password</Label>
//                       <Input type="password" name="password" id="password" value={edit.password} onChange={handleChangeProfile} />
//                     </FormGroup>
//                     <Button type="submit" className='btn primary_btn'>Save Changes</Button>
//                   </Form>
//                 </CardBody>
//               </Card>
//             ) : (
//               <Card className="booking-card">
//                 <CardBody>
//                   <h3>My Bookings</h3>
//                   <Button onClick={handleViewBookings} className='btn primary_btn'>{view ? 'Hide Bookings' : 'View Bookings'}</Button>
//                   {view && (
//                     <ul className="booking-list">
//                       {myBookings.map(booking => (
//                         <li key={booking.id}>
//                           <strong>Tour Name:</strong> {booking.tourName}, 
//                           <strong>Guest Size:</strong> {booking.guestSize}, 
//                           <strong>Phone No:</strong> {booking.phone},
//                           <strong>Date:</strong> {booking.bookAt},
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </CardBody>
//               </Card>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import '../styles/myprofile.css';
import avatar from '../assets/images/avatar.jpg';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Container className="dashboard-container">
        <Row>
          <Col md={4}>
            <Card className="profile-card">
              <CardBody>
                <img src={avatar} alt="" />
                <p><strong>Name:</strong> {user.username}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </CardBody>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
