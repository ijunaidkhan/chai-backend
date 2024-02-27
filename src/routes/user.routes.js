import { Router } from 'express';
import { registerUser } from '../controller/user.controller.js'
import { upload }  from '../middlewares/multer.middleware.js'

// Create an Express router
const router =  Router();

// Define the route for user registration
const cpUpload = upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
])
// router.route('/register').post (cpUpload, registerUser)
router.post ("/register", cpUpload, registerUser) 
// Export the router directly, without wrapping in an object
export default router;