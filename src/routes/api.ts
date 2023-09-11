import express from 'express'
import StoreUserRequest from '../Requests/StoreUserRequest'
import UserController from '../controllers/UserController'
import LoginUserRequest from '../Requests/LoginUserRequest'
import SetUserFromRequest from '../Middleware/SetUserFromRequest'
import CheckIfUserIsVerified from '../Middleware/CheckIfUserIsVerified'
import CheckController from "../controllers/CheckController";

const Route = express.Router()

// user end points...
Route.post(
  'user/auth/register',
  StoreUserRequest.validate,
  UserController.register
)

Route.post('user/auth/login', LoginUserRequest.validate, UserController.login)
Route.post('user/auth/verify', LoginUserRequest.validate, UserController.verify)
Route.use(SetUserFromRequest.handle, CheckIfUserIsVerified.handle)
Route.get('/users', UserController.index)

// check end points...
Route.get('/checks', CheckController.index)
Route.post('/checks', CheckController.store)
export default Route
