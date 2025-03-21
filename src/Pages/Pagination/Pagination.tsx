import axios from "axios"
import React, { useEffect, useState } from "react"

interface Brewery {
  id: number
  name: string
  brewery_type: string
  street: string
  city: string
  state: string
  phone: string
  website_url: string
}

const Pagination = () => {
  const [breweryData, setBreweryData] = useState<Brewery[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 20

  const itemsPerPage = 10

  const getData = async (currentPage: number, searchTerm: string) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?
by_name=${searchTerm}&page=${currentPage}&per_page=${itemsPerPage}}`
      )

      setBreweryData(response.data)
    } catch (error) {
      console.error("brewery data: ", error)
    } finally {
      setLoading(false)
    }
  }

  const getTotalData = async (currentPage: number, itemsPerPage: number) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?page=${currentPage}&per_page=${itemsPerPage}`
      )

      setBreweryData(response.data)
    } catch (error) {
      console.error("brewery data: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTotalData(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    getData(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  console.log(breweryData)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="md:w-[70%] md:mx-auto mx-5 flex flex-col gap-5 sm:px-5 py-8 shadow px-2">
      <div className="flex text-sm ">
        <label htmlFor="search" className="mr-5">
          Search:{" "}
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 outline-none px-2 py-1 w-full"
        />
      </div>

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <table className="border border-gray-300 w-full mb-5">
              <thead className="bg-gray-200">
                <tr className="text-sm xl:text-lg">
                  <th className="border-b border-r  border-gray-300 px-2">
                    Name
                  </th>
                  <th className="border-b border-r py-1 border-gray-300 px-2">
                    Brewery Type
                  </th>
                  <th className="border-b border-r border-gray-300 px-2">
                    Address
                  </th>
                  <th className="border-b border-r border-gray-300 px-2">
                    Phone Number
                  </th>
                  <th className="border-b  border-gray-300 px-2">Website</th>
                </tr>
              </thead>
              <tbody>
                {breweryData.map((item, i) => (
                  <tr key={i} className="text-sm text-center xl:text-base">
                    <td className="border-b border-r border-gray-300 px-2">
                      {item.name}
                    </td>
                    <td className="border-b border-r border-gray-300 px-2 capitalize">
                      {item.brewery_type}
                    </td>
                    <td className="border-b border-r border-gray-300 px-2 py-1">
                      {item.street}, {item.city}, {item.state}
                    </td>
                    <td className="border-b border-r border-gray-300 px-2">
                      {item.phone}
                    </td>
                    <td className="border-b border-r border-r-gray-300 border-gray-300 px-2">
                      <a
                        href={item.website_url}
                        target="_blank"
                        className="underline hover:opacity-60 cursor-pointer">
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center text-sm">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="disabled:cursor-not-allowed border border-gray-300 px-5 py-2 cursor-pointer">
              Previous
            </button>
            <p>Page {currentPage}</p>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="disabled:cursor-not-allowed border border-gray-300 px-5 py-2 cursor-pointer">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Pagination
