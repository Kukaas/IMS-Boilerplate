import { Router, RequestHandler } from 'express';
import { createSession, verifySession, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/session', createSession as RequestHandler);
router.get('/verify-session', verifySession as RequestHandler);
router.post('/logout', logout as RequestHandler);

module.exports = router;
