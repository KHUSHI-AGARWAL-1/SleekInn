import React, { useState,useContext } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link,useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import {AuthContext} from './../context/AuthContext'
import {BASE_URL} from './../utils/config'
import Cookies from 'js-cookie';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username:'undefined',
    email: 'undefined',
    password: 'undefined',
    
  });
  const {dispatch} = useContext(AuthContext)
  const navigate=useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async(e) => {
    e.preventDefault();
    dispatch({type:'Login_Start'})
    try {
      const res= await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{'content-type':'application/json',
      },
        credentials:'include',
        body:JSON.stringify(credentials)
       })
      console.log(res+" kash")
       const result= await res.json()
       if(!res.ok) alert(result.message)
       const token = result.token;
       Cookies.set('token', token, { expires: 15, path: '/' });
      //  console.log(Cookies.get('token') +"login access")
      dispatch({type:'Login_Success',payload:result.data})
      navigate('/')
    } 
    catch (err) {
      dispatch({type:'Login_Failure',payload:err.message})
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login_container d-flex justify-content-between'>
              <div className='login_img'>
                <img src={registerImg} alt='' />
              </div>

              <div className='login_form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>

                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type='email'
                      placeholder='Email'
                      required
                      id='email'
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                   Login
                  </Button>
                </Form>
                <p>
                  Don't have an account?<Link to='/register'>Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
