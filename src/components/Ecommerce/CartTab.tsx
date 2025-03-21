import { useSelector } from "react-redux"
import CartItem from "./CartItem"
import { RootState } from "../../store"
import { useDispatch } from "react-redux"
import { toggleStatusTab } from "../../store/cart"
import { products } from "../../data/data"

const CartTab = () => {
  const carts = useSelector((store: RootState) => store.cart.items)
  const statusTab = useSelector((store: RootState) => store.cart.statusTab)
  const dispatch = useDispatch()

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab())
  }

  const totalAmount = carts.reduce((sum, cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId)
    return sum + (product ? product.price * cartItem.quantity : 0)
  }, 0)

  return (
    <div
      className={`fixed top-0 right-0 px-5 py-3 bg-gray-300 shadow-2xl h-full grid gap-3 xs:w-max w-full transform transition-transform overflow-y-auto duration-500 ${
        statusTab === false ? "translate-x-full" : ""
      }`}>
      <h2 className="flex items-start justify-between">
        Your Cart{" "}
        <button
          className="cursor-pointer font-semibold"
          onClick={handleCloseTabCart}>
          x
        </button>
      </h2>
      <div className="flex flex-col gap-5">
        {carts.map((item, key) => (
          <CartItem key={key} product={item} />
        ))}
      </div>

      <div>
        <p className="text-center font-semibold">
          Total amount: ${totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between gap-5">
        <button
          onClick={handleCloseTabCart}
          className="border h-max py-3 px-3 cursor-pointer">
          Close
        </button>
        <button
          onClick={handleCloseTabCart}
          className="border h-max py-3 px-3 cursor-pointer">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartTab
