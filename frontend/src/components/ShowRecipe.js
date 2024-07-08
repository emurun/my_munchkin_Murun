import { useState, useEffect } from "react"
import "./ShowRecipe.css"
import { useParams } from 'react-router-dom'
import React from 'react'
import Select from 'react-select'

const SERVICE_URL = process.env.RUN_TIME === "development" ? "http://localhost:8080" : ""

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' }
]


const fetchRecipe = async (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${SERVICE_URL}api/recipes/${id}`, {
    headers,
    method: "GET"
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json
}

const fetchComments = async (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${SERVICE_URL}api/comments?recipe_id=${id}`, {
    headers,
    method: "GET"
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json.reverse()
}

const fetchRatings = async (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${SERVICE_URL}/api/ratings?recipe_id=${id}`, {
    headers
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json.reverse()
}

const fetchAddComment = async (body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${SERVICE_URL}/api/comments/`, {
    headers,
    body: JSON.stringify(body),
    method: "POST"
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json
}

const fetchAddRating = async (body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${SERVICE_URL}/api/ratings/`, {
    headers,
    body: JSON.stringify(body),
    method: "POST"
  })
  const json = await response.json()
  if (response.status > 299) throw new Error(json.message);
  return json
}





const ShowRecipe = ({ user }) => {

  const { id } = useParams()
  const [recipe, setRecipe] = useState(undefined)
  const [currentComment, setCurrentComment] = useState("")
  const [comments, setComments] = useState(undefined)
  const [rating, setRating] = useState(undefined)
  const [ratings, setRatings] = useState(undefined)
  const [description, setDescription] = useState("")
  useEffect(() => {
    fetchRecipe(id)
      .then(setRecipe)
      .catch(err => {
        console.log("Error fetching recipe:", err)
      })



    fetchComments(id)
      .then(setComments)
      .catch(err => {
        console.log("Error fetching comments:", err)
      })

    fetchRatings(id)
      .then(setRatings)
      .catch(err => {
        console.log("Error fetching comments:", err)
      })
  }, [])

  const handleAddComment = () => {
    const body = {
      content: currentComment,
      recipeId: Number(id),
      username: user.username,
      userId: user.id
    }
    fetchAddComment(body)
      .then(() => {
        console.log("Successfully added comment")
        setCurrentComment("")
        fetchComments(id)
          .then(setComments)
          .catch(err => {
            console.log("Error fetching comments:", err)
          })
      })
      .catch(err => {
        console.log("Error while adding comment")
      })
  }

  const handleAddReview = () => {
    const body = {
      stars: rating,
      description,
      recipeId: id,
      userId: user.id

    }
    fetchAddRating(body)
      .then(() => {
        setRating(undefined)
        setDescription("")
        fetchRatings(id)
          .then(setRatings)
          .catch(err => {
            console.log("Error fetching comments:", err)
          })
      })
      .catch(err => {
        console.log("Error while adding rating")
      })
  }

  const isLoading = recipe === undefined || comments === undefined

  if (isLoading) {
    return (
      <div className="add-recipe">
        <div className="box-container rounded-lg border border-gray-400 bg-white p-4 shadow-sm transition sm:p-6">
          ...Loading
        </div>
      </div>
    )
  }

  return (
    <div className="add-recipe rounded-lg border border-gray-400 bg-white p-4 shadow-sm transition sm:p-6">
      <div className="box-container">
        <div className="box">
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {recipe.name}
          </h1>
          <p className="mt-4 leading-relaxed text-gray-500">
            Created by {recipe.userName}
          </p>
          <p className="mt-4 leading-relaxed">
            Ingredients:
          </p>
          <ul>
            {
              recipe.Ingredients?.map(ingredient => ingredient.name).join(", ")
            }
          </ul>


        </div>
        <div className="box">
          <p className="mt-10 leading-relaxed w-full">
            Instructions: {recipe.instructions}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full gap-4 border rounded-lg p-3 mb-3">
        <div className="w-1/2">
          <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Ratings </label>
          <div className="h-[200px] overflow-y-auto border rounded-lg p-3">
            {
              ratings?.map((c, index) => {
                return (
                  <div key={index} className="h-[50px] flex p-2 items-center gap-4 border rounded-lg border-gray-200 mb-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                      alt=""
                      className="size-20 rounded-lg object-cover h-[40px] w-[40px]"
                    />
                    <div>
                      <h3 className="text-lg/tight font-medium text-gray-900">{c.User?.username}
                        {'⭐'.repeat(c.stars)}
                      </h3>
                      <p className="mt-0.5 text-gray-700 text-sm">
                        {c.description}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Stars </label>
          <Select onChange={(choice) => {
            setRating(choice.value)
          }} placeholder="1 - 5 stars" className="basic-multi-select" options={options} classNamePrefix="select" />
          <div className="mt-3">
            <label htmlFor="instruction" className="block text-sm font-medium text-gray-700"> Description </label>
            <textarea
              id="instruction"
              className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
              rows="4"
              placeholder="Enter any additional intructions..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <button
            className="w-[100] flex-end mt-2 inline-block shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring active:text-blue-500"
            onClick={handleAddReview}
          >
            Add Review
          </button>
          <div >

          </div>

        </div>
        <div className="w-1/2">
          <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> Comments </label>
          <div className="border rounded-lg h-[200px] overflow-y-auto p-3">

            {
              comments?.map((c, index) => {
                return (
                  <div key={index} className="h-[50px] flex p-2 items-center gap-4 border rounded-lg border-gray-200 mb-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                      alt=""
                      className="size-20 rounded-lg object-cover h-[40px] w-[40px]"
                    />
                    <div>
                      <h3 className="text-lg/tight font-medium text-gray-900">{c.User?.username}</h3>
                      <p className="mt-0.5 text-gray-700 text-sm">
                        {c.content}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            user !== undefined && <div className="flex flex-col 2 mt-3">
              <label htmlFor="instruction" className="block text-sm font-medium text-gray-700"> Leave a comment </label>

              <textarea
                id="instruction"
                className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                rows="4"
                value={currentComment}
                placeholder="I like this recipe..."
                onChange={(event) => setCurrentComment(event.target.value)}
              ></textarea>
              <button
                className="w-[100] flex-end mt-2 inline-block shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring active:text-blue-500"
                onClick={handleAddComment}
              >
                Comment
              </button>
            </div>
          }
        </div>
      </div>


    </div>
  )
}

export { ShowRecipe }
