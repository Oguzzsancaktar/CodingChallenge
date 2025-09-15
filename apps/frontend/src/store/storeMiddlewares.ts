import { authApiSlice } from "@/services/authServices"
import { profileApiSlice } from "@/services/profileServices"
import { githubApiSlice } from "@/services/githubServices"

const storeMiddlewares = [
  authApiSlice.middleware,
  profileApiSlice.middleware,
  githubApiSlice.middleware
]

export default storeMiddlewares
