import TokenService from '../services/token-service.js';

const tokenService = new TokenService();

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.error('No token provided');
        return res.status(401).send('No token provided.');
    }

    tokenService.verifyIdToken(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.error('Token verification failed', error);
            res.status(403).send('Could not verify token.');
        });
};

