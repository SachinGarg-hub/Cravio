const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        if (err.name === 'ZodError') {
            const errors = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors
            });
        }
        next(err);
    }
};

module.exports = validate;
