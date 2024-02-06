import { AppDataSource } from '../database/datasource'
import { designationEntity } from "../entity/designation.entity";
import { error } from 'console';

export class designationController {
    public async getdesignation(req: any, res: any) {
        try {
            const designation = AppDataSource.getRepository(designationEntity)
            const designationdata = await designation.find({ where: { is_active: 1 } })
            return res.status(200).send(designationdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
    public async updatedesignation(req: any, res: any) {

        try {

            const designationId = req?.params?.id

            const designationRepository = AppDataSource.getRepository(designationEntity)
            const designationDetail = await designationRepository.findOne({ where: { id: designationId } })
            if (!designationDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (designationDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const designationData = {
                name: req?.body?.name
            }


            const designation = designationRepository.merge(designationDetail, designationData)

            const updatedesignation = designationRepository.save(designation)
            return res.status(200).send(updatedesignation);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async adddesignation(req: any, res: any) {
        try {
            const designation = AppDataSource.getRepository(designationEntity)

            let designationData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newdesignation = designation.create(designationData)
            const adddesignation = designation.save(newdesignation)
            return res.status(200).send(adddesignation)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async softdelete(req: any, res: any) {
        try {
            const designationId = req?.params?.id
            const { is_active } = req?.body
            const designation = AppDataSource.getRepository(designationEntity)

            const designationDetail = await designation.findOne({ where: { id: designationId } })

            if (!designationDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            designationDetail['is_active'] = is_active

            const designationStatus = await designation.save(designationDetail)
            return res.send(designationStatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}