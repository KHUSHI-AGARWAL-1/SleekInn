import { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo1.jpeg'
import '../../styles/header.css'
import { AuthContext } from './../../context/AuthContext'
import Cookies from 'js-cookie'

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]


const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  // const logout = () => {
  //   dispatch({ type: 'LogOut' })
  //   navigate('/')
  // }

  const logout = async () => {
    try {
      // Call your backend logout API
      const response = await fetch('http://localhost:4000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        Cookies.remove('token');//empty
        console.log(Cookies.get('token'))
        // If logout is successful, update the user state
        dispatch({ type: 'LogOut' });
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }


  const dashboard = e => {
    e.preventDefault();
    navigate("/dashboard")
  }
  const stickeyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header")
      }
      else {
        headerRef.current.classList.remove("sticky_header")
      }
    })
  }
  useEffect(() => {
    stickeyHeaderFunc();

    return window.removeEventListener("scroll", stickeyHeaderFunc)
  })
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav_wrapper d-flex align-items-center justify-content-between'>

            {/* logo */}
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            {/* menu */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {
                  nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? 'active_link' : ""}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>


            <div className="nav_right d-flex align-items-center gap-4" >
              <div className="nav_btns d-flex align-items-center gap-4" >

                {
                  user ?
                    <>
                      <h5 className='mb-0-'> Welcome {user.username}!</h5>
                      {user.isPremium &&<i class="ri-verified-badge-fill"></i>}
                      <Button className='btn secondary_btn' onClick={dashboard}><i class="ri-user-fill"></i></Button>
                      <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                    </>
                    : <>
                      <Button className='btn secondary_btn'><Link to='/login'>Login</Link></Button>
                      <Button className='btn primary_btn'><Link to='/register'>Register</Link></Button>
                    </>
                }

              </div>
              <span className="mobile_menu"><i class="fa-solid fa-bars"></i></span>
            </div>
          </div>


        </Row>
      </Container>
    </header>
  )
}

export default Header