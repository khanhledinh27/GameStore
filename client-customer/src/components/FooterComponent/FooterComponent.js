import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import './FooterComponent.css'
export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#7B7B7B' }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <span className='me-3'>Free Register For <b>NOW</b></span>
            <MDBBtn  type='button' outline color="light" rounded>
              <a className="btnwhite"href='/signup'>Sign up!</a>
            </MDBBtn>
          </p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: 
        <a className='text-white' href='/'>
           GameLord
        </a>
      </div>
    </MDBFooter>
  );
}