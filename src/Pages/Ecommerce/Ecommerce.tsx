import React from "react"
import { products } from "../../data/data"
import ProductDetail from "../../components/Ecommerce/ProductDetail"

const Ecommerce = () => {
  console.log(products)

  return (
    <div>
      {products.map((item, i) => (
        <ProductDetail key={i} product={item} />
      ))}
    </div>
  )
}

export default Ecommerce
