import { addToCart } from "../../store/cart"
import { useDispatch } from "react-redux"

type Product = {
  id: number
  name: string
  price: number
  quantity: number
}

interface ProductDetailProps {
  product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    )
  }

  return (
    <div className="border border-gray-300 flex flex-col pt-2 pb-3 px-3">
      <div>
        <h3 className="font-medium">Name: {product.name}</h3>
        <p className="font-medium">Price: ${product.price}</p>
        <button
          className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-300 duration-300"
          onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
