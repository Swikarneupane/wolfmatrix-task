import React, { useEffect, useState } from "react"
import { products } from "../../data/data"
import { useDispatch } from "react-redux"
import { changeQuantity, removeItem } from "../../store/cart"

type Product = {
  productId: number
  quantity: number
}

type ProductDetail = {
  id: number
  name: string
  price: number
  quantity: number
}

interface ProductDetailProps {
  product: Product
}

const CartItem: React.FC<ProductDetailProps> = ({ product }) => {
  const [detail, setDetail] = useState<ProductDetail | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const findDetail =
      products.find((item) => item.id === product.productId) || null
    console.log("FInd Detail: ", findDetail)
    setDetail(findDetail)
  }, [product.productId, product.quantity])

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: product.productId,
        quantity: product.quantity - 1,
      })
    )
  }

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: product.productId,
        quantity: product.quantity + 1,
      })
    )
  }

  const handleRemoveItem = () => {
    dispatch(
      removeItem({
        productId: product.productId,
      })
    )
  }

  return (
    <div className="flex justify-between items-center flex-col border  gap-2 py-3 px-7">
      <span
        className="fixed right-7 text-sm font-light cursor-pointer"
        onClick={handleRemoveItem}>
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12">
          <path
            d="M4.5 3V1.5a1 1 0 011-1h4a1 1 0 011 1V3M0 3.5h15m-13.5 0v10a1 1 0 001 1h10a1 1 0 001-1v-10M7.5 7v5m-3-3v3m6-3v3"
            stroke="currentColor"></path>
        </svg>
      </span>
      <h3 className="font-medium">{detail?.name} </h3>
      <p className="text-sm font-light">
        <span className="mr-1">$</span>
        {(Number(detail?.price || 0) * Number(detail?.quantity || 0)).toFixed(
          2
        )}{" "}
        /pc
      </p>
      <div className="text-sm font-medium flex gap-3">
        <button
          onClick={handleMinusQuantity}
          className="font-extrabold cursor-pointer border px-2">
          -
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={handlePlusQuantity}
          className="font-extrabold cursor-pointer border px-2">
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem
