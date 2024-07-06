import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const SERVICE_URL = process.env.RUN_TIME === "production" ? "" : "http://localhost:8080"

const fetchLogin = async (body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json")
  const response = await fetch(`${SERVICE_URL}/api/users/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST"
  })

  const json = await response.json()
  if (response.status === 404) throw new Error("Incorrect password or username");
  return json
}

const Login = ({ setUser, user }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleLogin = () => {
    fetchLogin({ email, password })
      .then(response => {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
      })
      .catch(err => {
        console.log("Login error", err)
      })
  }

  useEffect(() => {
    if (user)
      navigate('/');
  }, [user, navigate])

  return (
    <div className="log-in">
      <div className="box-container rounded-lg border border-gray-900 bg-white p-4 shadow-sm transition sm:p-6">
        <form action="#" className="mt-8 grid grid-cols-6  w-full">
          <div className="col-span-4 col-start-2 flex flex-col gap-3">
            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
              <input
                type="email"
                id="Email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
              <input
                type="password"
                id="Password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <button
              className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}


export { Login }