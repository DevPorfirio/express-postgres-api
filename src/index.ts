import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRoutes from './routes/user-routes';

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de Usuários',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID do usuário',
                        },
                        name: {
                            type: 'string',
                            description: 'Nome do usuário',
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                        },
                    },
                },
            },
        },
        paths: {
            '/api/users/{id}': {
                get: {
                    summary: 'Obter um usuário',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID do usuário',
                            schema: {
                                type: 'integer',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Usuário encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',  // Referência ao esquema User
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Usuário não encontrado',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/user-routes.ts', './src/controllers/user-controller.ts'], // Caminho para seus arquivos de código
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
