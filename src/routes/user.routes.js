import { Router } from 'express';
import { registerUser } from '../controller/user.controller.js'

// Create an Express router
const router = Router();

// Define the route for user registration
router.route("/register").post(registerUser)

// Export the router directly, without wrapping in an object
export default router;