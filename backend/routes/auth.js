import { Router } from 'express';
import { logOutUser, loginFailed, loginSuccess } from '../controllers/auth.js';
import passport from '../config/passport.js';
import { CLIENT_URL } from '../config/default.js';

const router = Router();

router.get('/login/success', loginSuccess);

router.get('/login/failed', loginFailed);

router.get('/logout', logOutUser);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: CLIENT_URL,
		failureRedirect: '/login/failed',
	})
);

router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get(
	'/github/callback',
	passport.authenticate('github', {
		successRedirect: CLIENT_URL,
		failureRedirect: '/login/failed',
	})
);

router.get(
	'/facebook',
	passport.authenticate('facebook', { scope: ['profile'] })
);

router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: CLIENT_URL,
		failureRedirect: '/login/failed',
	})
);

export default router;
