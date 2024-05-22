import React, { useState, useContext } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext'
import { BASE_URL } from './../utils/config'
import Cookies from 'js-cookie';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: 'undefined', // Match the state keys
    email: 'undefined',
    password: 'undefined',
   
  });

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const result = await res.json()
      if (!res.ok) alert(result.message)
      // const token = result.data.token;

      // // Set the token in a cookie using js-cookie
      // Cookies.set('token', token, { expires: 15, path: '/' });

      dispatch({ type: 'Register_Success' })
      navigate('/login')
    }
    catch (err) {
      console.log(err)
      alert(err.message)

    }

  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login_container d-flex justify-content-between'>
              <div className='login_img'>
                <img src={loginImg} alt='' />
              </div>

              <div className='login_form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>

                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type='name'
                      placeholder='Username'
                      required
                      id='username'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='email'
                      placeholder='Email'
                      required
                      id='email'
                      onChange={handleChange}
                    />

                  </FormGroup>
                  {/* <FormGroup className='radio'><div style={{color:'white',fontWeight:"bolder"}}>Role:</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="radio" id="user" name="role" value="user" onChange={handleChange} />
                      <label htmlFor="user">User</label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="radio" id="admin" name="role" value="admin" onChange={handleChange} />
                      <label htmlFor="admin">Admin</label>
                    </div>
                  </FormGroup> */}
                  <FormGroup>
                    <input
                      type='password'
                      placeholder='Password'
                      required
                      id='password'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className='btn secondary_btn auth_btn' type='submit'>
                    Register
                  </Button>
                </Form>
                <p>
                  Already have an account?<Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
