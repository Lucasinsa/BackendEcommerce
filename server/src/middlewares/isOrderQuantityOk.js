export default (req,res,next) => {
    try {
        const data = req.body;
        if (isNaN(Number(data.quantity)) || data.quantity <= 0) {
            throw new Error("The quantity must be a number higher than 0.");
        }
        return next()
    } catch (error) {
        return next(error)
    }
}