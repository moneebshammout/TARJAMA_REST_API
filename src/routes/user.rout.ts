import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import validator from '@middleware/schema-validator';
import { register, login } from '@service/user.service';
import { registerSchema, loginSchema } from '@validator/user.schema';

const router: AsyncRouterInstance = AsyncRouter();

router.post('/register', registerSchema, validator, register);
router.post('/login', loginSchema, validator, login);

export default router;
