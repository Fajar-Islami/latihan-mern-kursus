import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ahmad Fajar',
    email: 'ahmad@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Fajar Islami',
    email: 'fajar@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
