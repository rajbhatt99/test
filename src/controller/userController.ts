import { error } from 'console'
import { AppDataSource } from '../database/datasource'
import { users } from '../entity/user.entity'
import { comparePassword, encrypt } from '../helper/crypto'

export class userController {
    public async getUser(req: any, res: any) {
        try {
            const userRepositry = AppDataSource.getRepository(users)
            const userdata = await userRepositry.find({where:{is_active:1}})
            return res.status(200).send(userdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async getuserid(req: any, res: any) {
        try {
            const id = {
               id: req?.params?.id,
               is_acttive:1
            }
            const userRepositry = AppDataSource.getRepository(users)
            const userdata = await userRepositry.findOneBy( id )
            return res.status(200).send(userdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
    public async addUser(req: any, res: any) {
        try {
            const userRepositry = AppDataSource.getRepository(users);

            const hash = await encrypt(req?.body?.password);

            console.log(req.body);

            let userData: any = {
                name: req?.body?.name,
                mobile: req?.body?.mobile,
                email: req?.body?.email,
                password: hash,
                age: req?.body?.age,
                designation_id: req?.body?.designation_id,
                is_active: 1
            };

            const newuser = userRepositry.create(userData)
            const adduser = userRepositry.save(newuser)
            return res.status(200).send(adduser)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async updateUser(req: any, res: any) {

        try {

            const userId = req?.params?.id

            const userRepository = AppDataSource.getRepository(users)
            const userDetail = await userRepository.findOne({ where: { id: userId } })
            if (!userDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (userDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const UsersData = {
                name: req?.body?.name,
                mobile: req?.body?.mobile,
                email: req?.body?.email,
                age: req?.body?.age,
                designation_id: req?.body?.designation_id
            }

            const user = userRepository.merge(userDetail, UsersData)

            const updateUser = userRepository.save(user)

            return res.status(200).send(updateUser);
        } catch (error) {
            console.error(error);
             return res.status(500).send("Internal server error");
        }

    }
    public async updateUserPassword(req: any, res: any) {
        try {
            const userRepositry = AppDataSource.getRepository(users);
            const userId = req?.params?.id;
            const userData = await userRepositry.findOne({
                where: { id: userId }
            });

            if (!userData) {
                return res.status(404).send("User not found");
            }

            let isEqual = false;

            if (userData.password) {
                isEqual = await comparePassword(req?.body?.oldPassword, userData.password);
            }

            if (!isEqual) {
                return res.status(401).send("Old password is incorrect");
            }

            const hash = await encrypt(req?.body?.password);

            userData.password = hash;

            const updatedUser = await userRepositry.save(userData);

            return res.status(200).send(updatedUser);

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }
    }
    public async softdelete(req: any, res: any) {
        try {
            const userId = req?.params?.id
            const { is_active } = req?.body
            const userRepositry = AppDataSource.getRepository(users);

            const userDetail = await userRepositry.findOne({ where: { id: userId } })

            if (!userDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            userDetail['is_active'] = is_active

            const userStatus = await userRepositry.save(userDetail)
            return res.send(userStatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}