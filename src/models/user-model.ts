import { Pool } from 'pg';
import { User } from '../types/user';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export const getAllUsers = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

export const createUser = async (name: string, email: string): Promise<User> => {
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return result.rows[0];
};

export const updateUser = async (id: number, name: string, email: string): Promise<User | null> => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
};

export const deleteUser = async (id: number): Promise<User | null> => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
