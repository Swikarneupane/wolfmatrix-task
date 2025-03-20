import React from "react"
import { Product } from "../../data/data"

const ProductDetail = ({ product }) => {
  return (
    <div className="border w-[50%] flex gap-10">
      <div>
        <h3 className="text-lg font-bold">Name: {product.name}</h3>
        <p>Price: {product.price}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
      <div>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductDetail
