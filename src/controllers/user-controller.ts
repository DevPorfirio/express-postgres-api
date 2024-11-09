import { Request, Response } from 'express';
import * as UserModel from '../models/user-model';
import { User } from '../types/user';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await UserModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await UserModel.getUserById(Number(id));
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Nome e email são obrigatórios
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email }: User = req.body;

    if (!name || !email) {
        res.status(400).json({ error: 'Nome e email são obrigatórios' });
        return;
    }

    try {
        const newUser = await UserModel.createUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar usuário' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Nome e email são obrigatórios
 *       404:
 *         description: Usuário não encontrado
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email }: User = req.body;

    if (!name || !email) {
        res.status(400).json({ error: 'Nome e email são obrigatórios' });
        return;
    }

    try {
        const updatedUser = await UserModel.updateUser(Number(id), name, email);
        if (!updatedUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.deleteUser(Number(id));
        if (!deletedUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};
