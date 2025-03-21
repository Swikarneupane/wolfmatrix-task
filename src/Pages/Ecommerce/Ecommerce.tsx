import { useSelector } from "react-redux"
import CartTab from "../../components/Ecommerce/CartTab"
import ProductDetail from "../../components/Ecommerce/ProductDetail"
import { products } from "../../data/data"
import { useState, useEffect } from "react"
import { RootState } from "../../store"
import { useDispatch } from "react-redux"
import { toggleStatusTab } from "../../store/cart"

const Ecommerce = () => {
  const [totalQuantity, setTotalQuantity] = useState(0)

  const dispatch = useDispatch()

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab())
  }

  const carts = useSelector((store: RootState) => store.cart.items)

  useEffect(() => {
    let total = 0
    carts.forEach((item) => (total += item.quantity))
    setTotalQuantity(total)
  }, [carts])

  return (
    <div className="sm:w-[70%] w-[90%] mx-auto py-10 shadow-sm sm:px-10 px-2">
      <div>
        <h3 className="text-center mb-5 font-medium text-lg">Products List</h3>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {products.map((item) => (
            <ProductDetail key={item.id} product={item} />
          ))}
        </div>
      </div>

      <div className="fixed top-3 right-3">
        <div className="flex">
          <div className="cursor-pointer" onClick={handleOpenTabCart}>
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20">
              <path
                d="M.5.5l.6 2m0 0l2.4 8h11v-6a2 2 0 00-2-2H1.1zm11.4 12a1 1 0 110-2 1 1 0 010 2zm-8-1a1 1 0 112 0 1 1 0 01-2 0z"
                stroke="currentColor"></path>
            </svg>{" "}
            <p className="fixed -mt-3 -ml-1 px-1 border text-xs bg-red-600 text-white rounded-full text-center">
              {totalQuantity}
            </p>
          </div>
        </div>
        <CartTab />
      </div>
    </div>
  )
}

export default Ecommerce
