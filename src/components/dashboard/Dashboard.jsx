// import React from 'react'
import Logout from '../../authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser  } from '../../hooks/useUser';



export default function Dashboard() {

  let navigate = useNavigate();
  const { token } = useUser();

  return (
    <>
    </>
  );
}
