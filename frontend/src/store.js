import { configureStore } from '@reduxjs/toolkit'
import authenticatedReducer from './Features/authenticatedSlice'

export default configureStore({
  reducer: {
    authenticatedSlice: authenticatedReducer
  },
})