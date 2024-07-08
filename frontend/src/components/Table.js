// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
// import "./Table.css";
// import { MdStarBorderPurple500 } from "react-icons/md";

// const SERVICE_URL = process.env.RUN_TIME === "development" ? "http://localhost:8080" : ""

// const fetchData = async () => {
//   const response = await fetch(`${SERVICE_URL}/api/recipes`)
//   const json = await response.json()
//   if (Array.isArray(json)) return json
//   return []
// }

// export const Table = () => {
//   const [data, setData] = useState(undefined)
//   useEffect(() => {
//     fetchData().then(setData)
//   }, [])

//   return <div className="table-box">
//     {/* <div className="box-container rounded-lg border border-gray-900 bg-white p-4 shadow-sm transition sm:p-6"> */}
//     <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
//       <table className="mx-auto min-w-full min-h-[500px] divide-y-2 divide-gray-200 bg-white text-sm">
//         <thead className="border-b-[2px] bg-gray-100">
//           <tr>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Recipe ID</th>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ingredients</th>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Instructions</th>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created By</th>
//           </tr>
//         </thead>


//         <tbody className="divide-y divide-gray-200 min-w-12">
//           {
//             data?.map(row => {
//               return <tr className="odd:bg-gray-50 h-5" key={row.recipeId}>
//                 <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">{row.id}</td>
//                 <td className="text-center whitespace-nowrap px-4 py-2 text-blue-700"><Link to={`/recipes/${row.id}`} style={{ textDecoration: 'underline' }}>{row.title}</Link></td>
//                 <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.Ingredients?.map(i => i.name)?.join(", ")}</td>
//                 <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.instructions}</td>
//                 <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.User?.username}</td>
//               </tr>

//             })
//           }
//         </tbody>
//       </table>
//     </div>
//     {/* </div> */}
//   </div>

// }

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MdStarBorderPurple500 } from "react-icons/md";
import "./Table.css";

const SERVICE_URL = process.env.RUN_TIME === "development" ? "http://localhost:8080" : ""

const fetchData = async () => {
  const response = await fetch(`${SERVICE_URL}/api/recipes`);
  const json = await response.json();
  if (Array.isArray(json)) return json;
  return [];
}

export const Table = () => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="table-box">
      <div className="overflow-x-auto rounded-lg border border-gray-200 w-full shadow-lg">
        <table className="mx-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="border-b-2 bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Recipe ID</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ingredients</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Instructions</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map(row => (
              <tr className="odd:bg-gray-50 hover:bg-gray-100 transition-colors h-5" key={row.id}>
                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">{row.id}</td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-blue-700">
                  <Link to={`/recipes/${row.id}`} className="underline hover:text-blue-500">{row.title}</Link>
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.Ingredients?.map(i => i.name)?.join(", ")}</td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.instructions}</td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{row.User?.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
