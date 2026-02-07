import { Characters } from "../../entity/Characters";
import { IPaginateOptions } from "../../interface/IGetOptions";
import { APIError } from "../../utils/error";
import { paginate } from "../../utils/paginate";
import { config } from "../../config";
import { Mints } from "../../entity/Mint";
require('dotenv').config();



export const showAllCharacters = async () => {
    const characters = await Characters.findAll();
    return characters;
}

export const getCharacters = async (options: IPaginateOptions) => {
    const query = {}
    

    return paginate(Characters, {
        ...options,
        search: {
            
        },
        sort: options.sort,
        order: options.order,
      });
    
};


export const showAllByCharacterId = async (id: number) => {
    const characters = await Characters.findAll({ where: { characterId: id } });
    return characters;
}


export const showByTokenId = async (tokenId: number) => {
        if (!tokenId) {
        throw new APIError(400, { message: "Invalid or missing tokenId" });
    }
    const character = await Characters.findOne({ where: { tokenId: tokenId } });

    if (!character)
        throw new APIError(404, { message: 'Character not found' });
    return character;
}

export const getMintedByOwner = async (owner: string) => {
   
    const mints = await Mints.findAll({
        where: { owner },
        order: [['createdAt', 'DESC']]
    });


    const results = await Promise.all(
        mints.map(async (m) => {
            const character = await Characters.findOne({
                where: { tokenId: m.tokenId }
            });

            return {
                tokenId: m.tokenId,
                characterId: m.characterId,
                imageUrl: `${process.env.BASE_URL || 'http://localhost:3020'}/images/${m.tokenId}.png`,
                mintedAt: m.createdAt,
                stats: character ? {
                    weapon: character.weapon,
                    helmet: character.helmet,
                    armor: character.armor,
                    guard: character.guard,
                    perfection: character.perfection,
                    atk: character.atk,
                    def: character.def,
                    hp: character.hp
                } : null
            };
        })
    );

    return results;
};

export const getTotalMinted = async () => {
    return await Mints.count();
};
