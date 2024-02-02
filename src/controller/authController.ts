import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/datasource'
import { users } from '../entity/user.entity'
import { comparePassword } from '../helper/crypto'

export class userLogin {
    public async userLogin(req: any, res: any) {
        try {
            const userRepositry = AppDataSource.getRepository(users);

            const { email, password } = req?.body

            const user = await userRepositry.findOne({
                where: { email: email }
            });

            if (!user) {
                return res.status(404).send("User Doesn't Exist");
            }

            const matchPassword = await comparePassword(password, user?.password)

            if (!matchPassword) {
                return res.status(404).send("Invalid Credentials");
            }
            const token = jwt.sign({ userId: user?.id, username: user?.name },
                "utfkgguguglghil", { expiresIn: '8h' })
            return res.status(200).send({ token: token, user });

        } catch (error) {
            console.error(error);
            return res.status(500).send("Intinternal Server Error");
        }
    }
}