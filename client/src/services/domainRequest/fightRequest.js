import { post } from "../requestHelper";

const entity = 'fights';

export const startFight = async (body) => {
    return await post(entity, body);
}
