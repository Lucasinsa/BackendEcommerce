export default (req,res,next) => {
    try {
        const { quantity, state } = req.body;
        if (!quantity && !state) {
            throw new Error(`Please, enter the new quantity or state.`);
          }
          if (quantity && (isNaN(Number(quantity)) || quantity <= 0)) {
            throw new Error("The quantity must be a number higher than 0.");
          }
        return next() 
    } catch (error) {
        return next(error)
    }
}