import { Request, Response, NextFunction } from "express";
// import { randomUUID } from "crypto";

import { ArmorItem } from "../entity/ArmorItems";
import { APIError } from "../utils/error";


export const CombineCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

      console.log("COMBINE req.body:", req.body); 

    const { armor_id, helmet_id, guard_id, weapon_id } = req.body;
    
    const ids = [armor_id, helmet_id, guard_id, weapon_id];
    
    const items = await ArmorItem.findAll({
      where: { original_ids: ids }
    });
    
    if (items.length !== 4) {
      throw new APIError(400, {
        message: "One or more item IDs are invalid"
      });
    }
    
    const itemMap: Record<string, ArmorItem> = {};
    for (const item of items) {
      itemMap[item.slot] = item;
    }
    
    console.log("COMBINE BODY:", req.body);
    const raritySummary = {
      basic: 0,
      refined: 0,
      arcane: 0,
      valiant: 0,
      mythic: 0,
      etheric: 0
    };

    for (const item of items) {
      const rarity = item.rarity_name as keyof typeof raritySummary;
      raritySummary[rarity] += 1;
    }

    // const character_id = randomUUID();

    return res.json({
      // character_id,
      items: {
        armor: itemMap["armor"],
        helmet: itemMap["helmet"],
        guard: itemMap["guard"],
        weapon: itemMap["weapon"]
      },
      rarity_summary: raritySummary
    });
  } catch (err) {
    next(err);
  }

  
};
