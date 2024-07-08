import { useEffect, useState } from "react";
import "./SignUp.css"
import myImage from './image.jpg'; // Importing the image
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SERVICE_URL = process.env.RUN_TIME === "development" ? "http://localhost:8080" : ""

const fetchSignUp = async (body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json")
  const response = await fetch(`${SERVICE_URL}/api/users/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST"
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json
}

// const getUsers = async () => {
//   const headers = new Headers();
//   const response = await fetch("http://localhost:3001/users")
//   const json = await response.json()
//   return json
// }

const SignUp = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSignUp = () => {
    fetchSignUp({
      username,
      email,
      password
    })
      .then((response) => {
        setUser(response)
        localStorage.setItem("user", JSON.stringify(response))
      })
      .catch(error => {
        console.log("failed signup with error:", error)
      })
  }
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate])

  return (
    <div className="sign-up">
      <div className="box-container rounded-lg border border-gray-900 bg-white p-4 shadow-sm transition sm:p-6">

        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
          {/* <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="text"
              id="email"
              name="last_name"
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div> */}
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Username </label>

            <input
              type="text"
              id="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span className="text-sm text-gray-700">
                I want to receive emails about events, product updates and company announcements.
              </span>
            </label>
          </div> */}

          {/* <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div> */}

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-end">
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-gray-700 underline">Log in</Link>.
            </p>
            <button
              className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              type="button"
              onClick={handleSignUp}
            >
              Create an account
            </button>


          </div>
        </form>

        <div className="box2">
          {/* Second box here/Image of Food */}
          {/* <img src={myImage} alt="Description" /> */}
        </div>
      </div>
    </div>
  )
}

export { SignUp }