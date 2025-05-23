const { verifyToken } = require('../middleware/authMiddleware');

async function secureRoutes(fastify, options) {
//   fastify.get('/secure', { preHandler: verifyToken }, async (req, reply) => {
//     reply.send({ message: 'This is a secure route' });
//   });
}

module.exports = secureRoutes;
