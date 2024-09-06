import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';





const AppLayout = () => {

  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const searchByKeyword =(event)=>{
    event.preventDefault()
    //url바꿔주기
    // navigate(`/moives?q=${keyword}`) // moives -> movies 오타로 인해서 검색값이 url 제대로 표시되어도 page not found 로 이동하여 데이터가 안왔다 
    navigate(`/movies?q=${keyword}`)
    setKeyword("")

  }



  return (
    <div>
         <Navbar expand="lg" className="nav-body" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/"><img src="https://cdnweb01.wikitree.co.kr/webdata/editor/202305/09/img_20230509113254_b805310c.webp" alt="" className='net-logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">movies</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event)=>setKeyword(event.target.value)}
            />
            <Button variant="outline-danger" type='submit'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet/>
    </div>
  )
}

export default AppLayout