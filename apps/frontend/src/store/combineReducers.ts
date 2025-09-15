import { combineReducers } from 'redux'
import { authApiSlice } from '@/services/authServices'
import { profileApiSlice } from '@/services/profileServices'
import { githubApiSlice } from '@/services/githubServices'

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [githubApiSlice.reducerPath]: githubApiSlice.reducer
})

export default rootReducer
