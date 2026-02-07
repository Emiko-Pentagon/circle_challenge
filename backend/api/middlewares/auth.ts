import { Request, Response, NextFunction } from 'express';
import { JWTPAYLOAD } from '../interface/JWTPayload';
// import { preProcessingGO } from '../services/auth-service/login.service';
import passport from 'passport';

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
};

export const superadminAuth = () => (req: Request, res: Response, next: NextFunction) => {
    if (isPathAllowed(req.originalUrl)) {
        return next();
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
};

export const isSuperadmin = (req: Request, res: Response, next: NextFunction) => {
    if (isPathAllowed(req.originalUrl)) {
        return next();
    }

    const payload = req.user as JWTPAYLOAD;
    if (payload.typeOfUser === 'superadmin') {
        return next();
    }

    res.sendStatus(401);
};

const isPathAllowed = (url: string) => {
    const allowedRoutes = ['login', 'signup', 'token'];
    return allowedRoutes.some(r => url.endsWith(r));
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (isPathAllowed(req.originalUrl)) {
        return next();
    }

    const payload = req.user as JWTPAYLOAD;
    if (payload.typeOfUser === 'owner') {
        return next();
    }

    res.sendStatus(401);
};

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('google', {
        scope: ['email', 'profile'],
        state: req.query.address as string
    })(req, res, next);
};

// export const googleAuthCallBack = (req: Request, res: Response, next: NextFunction) => {
//     return passport.authenticate(
//         'google',
//         { session: false },
//         async (err: any, profile: any) => {

//             if (err) {
//                 return res.status(500).json({ error: 'Google authentication failed', details: err });
//             }

//             if (!profile) {
//                 return res.status(401).json({ error: 'Google login unsuccessful' });
//             }

//             try {
//                 const token = await preProcessingGO(profile.username, profile.address, 'google');
//                 return res.json({ token });
//             } catch (e) {
//                 next(e);
//             }
//         }
//     )(req, res, next);
// };
