import { Router, Request, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { userStore } from '../store/userStore';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import crypto from 'crypto';

const router = Router();

// Simple in-memory refresh token store per userId
const userIdToRefreshTokens = new Map<string, Set<string>>();

function addRefreshToken(userId: string, token: string) {
  const set = userIdToRefreshTokens.get(userId) || new Set<string>();
  set.add(token);
  userIdToRefreshTokens.set(userId, set);
}

function revokeRefreshToken(userId: string, token: string) {
  const set = userIdToRefreshTokens.get(userId);
  if (set) {
    set.delete(token);
    if (set.size === 0) userIdToRefreshTokens.delete(userId);
  }
}

function revokeAllRefreshTokens(userId: string) {
  userIdToRefreshTokens.delete(userId);
}

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  const existing = userStore.getByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'email already registered' });
  }
  const passwordHash = await hashPassword(password);
  const userId = crypto.randomUUID();
  const user = userStore.createUser({ id: userId, email, passwordHash });
  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id });
  addRefreshToken(user.id, refreshToken);
  return res.status(201).json({ user: { id: user.id, email: user.email }, tokens: { accessToken, refreshToken } });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  const user = userStore.getByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id });
  addRefreshToken(user.id, refreshToken);
  return res.json({ user: { id: user.id, email: user.email }, tokens: { accessToken, refreshToken } });
});

router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required' });
  }
  try {
    const decoded: any = verifyRefreshToken(refreshToken);
    const userId = decoded.sub as string;
    const set = userIdToRefreshTokens.get(userId);
    if (!set || !set.has(refreshToken)) {
      return res.status(401).json({ error: 'invalid refresh token' });
    }
    const newAccess = signAccessToken({ sub: userId });
    const newRefresh = signRefreshToken({ sub: userId });
    // rotate tokens
    revokeRefreshToken(userId, refreshToken);
    addRefreshToken(userId, newRefresh);
    return res.json({ tokens: { accessToken: newAccess, refreshToken: newRefresh } });
  } catch (err) {
    return res.status(401).json({ error: 'invalid or expired refresh token' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required' });
  }
  try {
    const decoded: any = verifyRefreshToken(refreshToken);
    const userId = decoded.sub as string;
    revokeRefreshToken(userId, refreshToken);
    return res.status(204).send();
  } catch (err) {
    return res.status(200).json({ message: 'already logged out' });
  }
});

router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const userId = (req.user as any)?.sub as string | undefined;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = userStore.getById(userId);
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  return res.json({ user: { id: user.id, email: user.email } });
});

export default router;
