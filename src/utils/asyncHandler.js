// const asyncHandler = ()=> {}






export { asyncHandler } 


// const asyncHandler = (req) => {
//     (req, res, next) => {
//         Promise.resolve(req(req, res, next))
//         .catch((err) => next(err))

        
//     }
// }


const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch(error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}