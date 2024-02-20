export default (req,res,next) => {
    try {
        const { name, photo, email} = req.body;
        if(!name && !photo && !email) {
            throw new Error("Please, enter the new name, photo or email.");
          }
        return next() 
    } catch (error) {
        return next(error)
    }
}