import { Router } from 'express';
import { GetCharacterByTokenId, GetCharacters, PostCharacter, PutCharacter, GetMintedCharactersByOwner } from '../controllers/character.controller';
import { CombineCharacter } from '../controllers/displayCharacter.controller'
import { GetTotalMinted } from '../controllers/character.controller';

const router = Router();

router.post('/', PostCharacter);
router.put('/',  PutCharacter);
router.get("/total", GetTotalMinted);
router.get('/minted', GetMintedCharactersByOwner);
router.get('/', GetCharacters);
router.get('/:id', GetCharacterByTokenId);
router.post("/combine", CombineCharacter);


export {
    router as characterRoutes
};