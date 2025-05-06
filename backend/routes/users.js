import express from 'express';
import {auth} from '../middleware/auth.js';
import { register, login, logout } from '../controllers/authController.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

import router from '../routes/todos.js'

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User related operations
 */

/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "samuel23505@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Samuel235!"
 *               name:
 *                 type: string
 *                 example: "Samuel"
 *     responses:
 *       '201':
 *         description: New user registered successfully
 *       '400':
 *         description: User already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/signup', register);

/**
 * @openapi
 * /signin:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "samuel23505@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Samuel235!"
 *     responses:
 *       '200':
 *         description: Sign in successfully
 *       '400':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post('/signin', login);

/**
 * @openapi
 * /me:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user profile (requires auth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved
 *       '403':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/me', auth, getProfile);

/**
 * @openapi
 * /me:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user profile (requires auth)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samuel"
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.put('/me', auth, updateProfile);

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Log out the current user (requires auth)
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       '200':
 *         description: Logged out successfully
 *       '401':
 *         description: Unauthorized - No token or invalid token provided
 *       '500':
 *         description: Internal server error
 */
router.post("/logout", auth, logout);

export default router;
