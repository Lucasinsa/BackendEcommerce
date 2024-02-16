import { Types } from "mongoose"

export default (req,res,next) => {
    try {
        const pid = req.body.pid
        const uid = req.body.uid
        if(Types.ObjectId.isValid(pid) && Types.ObjectId.isValid(uid)){
            return next()
        } else {
            const error = new Error("Please, enter a valid ID in ObjectId format.")
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        return next(error)
    }
}