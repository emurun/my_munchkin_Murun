import { useEffect, useState } from "react"
import "./AddRecipe.css"
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const fetchIngredients = async () => {
  const response = await fetch("http://localhost:8080/api/ingredients/")
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json
}

const fetchCreate = async (body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch("http://localhost:8080/api/recipes/", {
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

const AddRecipe = ({ user }) => {
  const [title, setName] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState("")
  const [ingredientOptions, setIngredientOptions] = useState([])
  // const [review, setReview] = useState("5")
  const [createSuccess, setCreateSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetchIngredients()
      .then(opts => {
        const options = opts.map(o => ({ label: o.name, value: o.name }))
        setIngredientOptions(options)
      })

  }, [])

  useEffect(() => {
    if (!user) navigate("/")
  }, [user])

  // const { title, instructions, description, ingredients, userId } = req.body;
  const handleCreate = () => {
    const body = {
      title,
      ingredients,
      instructions,
      description: "",
      userId: user.id
    }
    fetchCreate(body)
      .then(response => {
        setCreateSuccess(true)
      })
      .catch(err => {
        console.log("Create Recipe error", err)
      })
  }

  if (createSuccess) {
    return (
      <div className="add-recipe">
        <div className="box-container rounded-lg border border-gray-400 bg-white p-4 shadow-sm transition sm:p-6">
          <div className="flex flex-col items-center h-full w-full pt-12">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              🦑 Recipe has been created successfully 🦑
            </h1>
            <p class="mt-4 leading-relaxed text-gray-500">
              You can find your recipe from home page.
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="add-recipe">
      <div className="box-container rounded-lg border border-gray-400 bg-white p-4 shadow-sm transition sm:p-6">
        <div className="box">

          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Add a new recipe 🦑
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            This is where you add a new recipe to our munchkin menu and it's gonna be great.
          </p>
          <div>
            <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Name </label>
            <input
              type="text"
              id="UserEmail"
              placeholder="Recipe Name"
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Ingredients </label>
            <Select onChange={(ings) => {
              const arr = ings.map(i => i.value)
              setIngredients(arr)
            }} className="basic-multi-select" options={ingredientOptions} isMulti classNamePrefix="select" />
          </div>
          {/* <div style={{ marginTop: "15px" }}>
            <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Review </label>
            <Select
              onChange={(review) => setReview(review.value)}
              className="basic-multi-select" options={options2} classNamePrefix="select" />
          </div> */}
        </div>
        {/* Second box  */}
        <div className="box">
          <div>
            <label htmlFor="instruction" className="block text-sm font-medium text-gray-700"> Instructions </label>

            <textarea
              id="instruction"
              className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
              rows="4"
              placeholder="Enter any additional intructions..."
              onChange={(event) => setInstructions(event.target.value)}
            ></textarea>
          </div>
        </div>

      </div>
      <div className="box-save flex justify-end">
        <button
          class="inline-block shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring active:text-blue-500"
          onClick={handleCreate}
        >
          Save Recipe
        </button>
      </div>
    </div>
  )
}

export { AddRecipe }