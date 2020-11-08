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
    password: bcrypt.hashSync('123456', 10),
    password: xxxx,
  },
  {
    name: 'Fajar Islami',
    password: bcrypt.hashSync('123456', 10),
    password: xxxx,
  },
];

export default users;
