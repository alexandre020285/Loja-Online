// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export interface UserData {
//   name: string;
//   email: string;
//   password: string;
// }

// export const authService = {
//   async register(userData: UserData) {
//     const { name, email, password } = userData;

//     // Verifica se o usuário já existe
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       throw new Error("Email já cadastrado");
//     }

//     // Criptografa a senha
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Cria o usuário no banco de dados
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     };
//   },

//   async login(email: string, password: string) {
//     // Busca o usuário no banco de dados
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       throw new Error("Usuário não encontrado");
//     }

//     // Verifica a senha
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       throw new Error("Senha incorreta");
//     }

//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     };
//   },

//   async getUserById(id: string) {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       throw new Error("Usuário não encontrado");
//     }

//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     };
//   },
// };
