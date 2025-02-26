import type { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

interface CustomRequest extends Request {
  body: {
    idToken: string;
  };
  cookies: {
    session?: string;
  };
}

// Create custom type for our handlers
type CustomRequestHandler = (
  req: CustomRequest, 
  res: Response
) => Promise<void | Response> | void | Response;

// Initialize Firebase Admin with service account
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const createSession: CustomRequestHandler = async (req: CustomRequest, res: Response) => {
  const { idToken } = req.body;
  
  if (!idToken) {
    return res.status(400).json({ error: 'ID Token is required' });
  }
  
  try {
    // Verify the ID token first
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    
    // Set cookie options
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const, // Changed from 'strict' to 'lax' for better compatibility
      path: '/',
    };

    // Set the cookie
    res.cookie('session', sessionCookie, options);
    
    // Send success response
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(401).json({ 
      error: 'Unauthorized',
      message: error instanceof Error ? error.message : 'Failed to create session'
    });
  }
};

export const verifySession: CustomRequestHandler = async (req: CustomRequest, res: Response) => {
  const sessionCookie = req.cookies.session || '';

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    res.status(200).json({ status: 'valid' });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const logout: CustomRequestHandler = (req: CustomRequest, res: Response) => {
  res.clearCookie('session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  res.status(200).json({ status: 'success' });
};
