export default (req,res,next) => {
    try {
        const { title, photo, price, stock } = req.body;
        if (!title && !photo && !price && !stock) {
            throw new Error("Please, enter the new title, photo, price or stock.");
        }
        return next() 
    } catch (error) {
        return next(error)
    }
}