import { Request, Response, NextFunction } from 'express';
import { insertCharacter } from '../services/character-service/insertCharacter.service';
import { AddCharacterDto } from '../dto/character/addCharacterDto';
import { updateCharacter } from '../services/character-service/updateCharacter.service';
import { UpdateCharacterDto } from '../dto/character/updateCharacterDto';
import { getCharacters, showByTokenId, getMintedByOwner } from '../services/character-service/showCharacter.service';
import { getTotalMinted } from "../services/character-service/showCharacter.service";



export const PostCharacter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addCharacterDto: AddCharacterDto = {
            ...req.body
        }
        await insertCharacter(addCharacterDto);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
}


export const PutCharacter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateCharacterDto: UpdateCharacterDto = {
            ...req.body
        }
        const result = await updateCharacter(updateCharacterDto);
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
}


export const GetCharacterByTokenId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenId = Number(req.query.token);

        if (!tokenId) {
            return res.status(400).json({ status: 'error', message: 'tokenId is required' });
        }

        const result = await showByTokenId(tokenId);
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
}
export const GetCharacters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort,
            order,
            q,
            ...filters
        } = req.query;

        const result = await getCharacters({
            page: Number(page),
            limit: Number(limit),
            sort: sort as string,
            order: order as any,
            search: filters,
            q: q as string
        });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        next(err);
    }
};


export const GetMintedCharactersByOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const owner = req.query.owner as string;
        if (!owner) {
            return res.status(400).json({ status: 'error', message: 'owner address is required' });
        }

        const result = await getMintedByOwner(owner);

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

export const GetTotalMinted = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total = await getTotalMinted();

        res.status(200).json({
            status: "success",
            total
        });
    } catch (err) {
        next(err);
    }
};