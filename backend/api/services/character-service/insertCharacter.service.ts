import { Characters } from "../../entity/Characters";
import { APIError } from "../../utils/error";
import { AddCharacterDto } from "../../dto/character/addCharacterDto";

export const insertCharacter = async (addCharacterDto: AddCharacterDto) => {
    const character = await Characters.create({
        characterId: addCharacterDto.characterId,
        tokenId: addCharacterDto.tokenId,
        weapon: addCharacterDto.weapon,
        helmet: addCharacterDto.helmet,
        armor: addCharacterDto.armor,
        guard: addCharacterDto.guard,
        perfection: addCharacterDto.perfection,
        atk: addCharacterDto.atk,
        def: addCharacterDto.def,
        hp: addCharacterDto.hp
    });

    if (!character)
        throw new APIError(400, { message: `Failed to create Character` });
}