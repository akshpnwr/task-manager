const asyncWrapper = (resolveFunction) => {
    return async (req, res, next) => {
        try {
            await resolveFunction(req, res, next);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper