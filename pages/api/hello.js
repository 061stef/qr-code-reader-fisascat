import { knex } from '../../lib/db'

export default async (req, res) => {
    try {
        const user = await knex.select().table('users');
        console.log(user);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e)
    }


}