

export const RoleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        next();
    };
};
