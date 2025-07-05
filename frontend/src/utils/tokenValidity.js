import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token) => {
    try {
        const decoded = jwtDecode(token)
        console.log(decoded);

        const currentTime = Date.now() / 1000;   // Current time in seconds
        if (decoded.exp > currentTime) {
            return {
                valid: true,
                user: decoded.user || null,
                email: decoded.email || null,
            }
        }
        else {
            localStorage.removeItem("token")
            return {
                valid: false,
                user: null,
                email: null,
            }
        }
    } catch (error) {
        return {
            valid: false,
            user: null,
            email: null,
        }
    }
}