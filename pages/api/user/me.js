import jwt from "jsonwebtoken";


export default async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['authourization'].replace('Bearer ', '');
    if (!token) return res.status(403).send({ message: 'A token is required for authentication' });
    try {
        const decoded = await jwt.decode(token, process.env.TOKEN_KEY);
        if (decoded) return res.status(200).send(decoded);
        return res.status(401).send({ message: 'Unauthorized' });
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
}