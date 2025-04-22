import jwt from 'jsonwebtoken';

export const generateTestToken = (user) => {
  const payload = {
    email : 'ritik@example.com',
    password: "abc@123"
  };

  const secret = process.env.JWT_SECRET;
  return jwt.sign(user || payload, secret, { expiresIn: '1h' });
};
