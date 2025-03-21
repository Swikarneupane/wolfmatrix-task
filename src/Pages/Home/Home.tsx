import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div className="text-center py-3 text-lg shadow mb-5">
        <nav>
          <ul className="flex gap-10 w-max mx-auto text-sm sm:text-lg">
            <li className="cursor-pointer">
              <Link to="/ecommerce">Ecommerce</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/form">Form</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/pagination">Pagination</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  )
}

export default Home
