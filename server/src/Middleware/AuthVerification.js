import { DecodedToken } from "../utility/TokenUtility";

// Reusable role-based middleware
export const RoleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        let token = req.headers['token'];

        if (!token) {
            token = req.cookies['token'];
        }

        const decoded = DecodedToken(token);

        if (decoded === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { email, user_id, role } = decoded;

        // Check if role is allowed
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }

        // Attach user info to request headers
        req.headers.email = email;
        req.headers.user_id = user_id;
        req.headers.role = role;

        next();
    };
};
