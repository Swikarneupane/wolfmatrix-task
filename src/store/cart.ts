import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
  productId: number
  quantity: number
}
interface CartState {
  items: CartItem[]
  statusTab: boolean
}

const initialState: CartState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts") as string)
    : [],
  statusTab: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      )
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity
      } else {
        state.items.push({ productId, quantity })
      }
      localStorage.setItem("carts", JSON.stringify(state.items))
    },
    changeQuantity(state, action) {
      const { productId, quantity } = action.payload
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      )
      if (quantity > 0) {
        state.items[indexProductId].quantity = quantity
      } else {
        state.items = state.items.filter((item) => item.productId !== productId)
      }
      localStorage.setItem("carts", JSON.stringify(state.items))
    },
    removeItem(state, action) {
      const { productId } = action.payload
      state.items = state.items.filter((item) => item.productId !== productId)
      localStorage.setItem("carts", JSON.stringify(state.items))
    },
    toggleStatusTab(state) {
      if (state.statusTab === false) {
        state.statusTab = true
      } else {
        state.statusTab = false
      }
    },
  },
})

export const { addToCart, changeQuantity, toggleStatusTab, removeItem } =
  cartSlice.actions
export default cartSlice.reducer
