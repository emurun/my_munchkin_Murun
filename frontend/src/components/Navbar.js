import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar({ user, setUser }) {
  const isLoggedIn = user !== undefined && user !== null

  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false)

  return (
    <>
      <div className="bg-gray-100 mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <div>

          <Link to="/" className="navbar-logo" >
            <h2 className="text-2xl font-bold text-gray-700 sm:text-3xl">MunchkinMenu <i className='fa-brands fa-viadeo' /> </h2>

          </Link>
        </div>
        <div className="sm:flex sm:gap-4">
          <Link
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            to='/'
          >
            Home
          </Link>
          {
            isLoggedIn &&
            <><Link
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              to='/add'
            >
              Add New Recipe
            </Link>
              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
              >
                {user.username}
              </Link>
              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                onClick={() => {
                  setUser(undefined)
                  localStorage.removeItem("user")
                }}
              >
                Log Out
              </Link>
            </>
          }

          {
            !isLoggedIn &&
            <><Link
              className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
              to='/signup'
            >
              Register
            </Link>

              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                to='/login'
              >
                Log In
              </Link>
            </>
          }



        </div>

      </div>
    </>
  )
}

export default Navbar