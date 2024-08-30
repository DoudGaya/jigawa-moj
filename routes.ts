/**
 * Public Routes: Routes that are accessible to the public 
 * @type {[String]}
 */
export const publicRoutes = [
    '/',
    '/contact',
    '/blog/:slug',
    '/email-verification',
    '/loading-uis'
]



/**
 * Public Routes: Routes that are used for authentication
 * routes will redirrect logged in users to dashbord 
 * @type { [String] }
 */


export const authRoutes = [
    '/login',
    '/register',
    '/error',
    '/forgot-password',
    '/new-password',
    '/staff-registration',
]

/**
 * Public Routes: Routes that are accessible to the public 
 * @type {String}
 * 
 */


export const apiRoutesPrefix = '/api/auth'


export const DEFAULT_LOGGED_IN_REDIRRECT = '/user/dashboard'