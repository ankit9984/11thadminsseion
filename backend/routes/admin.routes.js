import express from 'express';
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/admin_controller.js';

const router = express.Router();

router.post('/newadmin', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin)

export default router;