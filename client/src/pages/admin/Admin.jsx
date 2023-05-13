import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import MainContext from '../../MainContext'
import { useNavigate  } from "react-router-dom";

function Admin() {
  const { setAdminPage, isLoggedIn } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setAdminPage(true)
  })

  return (
    <div>Admin</div>
  )
}

export default Admin