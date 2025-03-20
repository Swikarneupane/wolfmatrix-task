import { createBrowserRouter } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Pagination from "../Pages/Pagination/Pagination"
import Ecommerce from "../Pages/Ecommerce/Ecommerce"
import Form from "../Pages/Form/Form"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/form",
        element: <Form></Form>,
      },
      {
        path: "/pagination",
        element: <Pagination></Pagination>,
      },
      {
        path: "/ecommerce",
        element: <Ecommerce></Ecommerce>,
      },
    ],
  },
])

export default router
