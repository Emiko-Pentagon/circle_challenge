import Web3 from "web3";
import { APIError } from "../../utils/error";
import { Characters } from "../../entity/Characters";
import { Mints } from "../../entity/Mint";
import { verifyPayment } from "../../blockchain/verifyPayment";
import { mintCharacter } from "../../blockchain/mintCharacter";
import { config } from "../../config";


export const updateCharacter = async ({
  owner,
  txHash,
}: {
  owner: string;
  txHash: string;
}) => {

  if (!Web3.utils.isAddress(owner)) {
    throw new APIError(400, { message: "Invalid wallet address" });
  }

  if (!txHash) {
    throw new APIError(400, { message: "Missing txHash" });
  }

  await verifyPayment(txHash, owner, 9);

  const existing = await Mints.findOne({ where: { txHash } });

  if (existing) {
    return {
      tokenId: existing.tokenId,
      contractTokenId: existing.contractTokenId,
      owner: existing.owner,
      imageUrl: `${config.server_url}/images/${existing.tokenId}.png`,
    };
  }

  // 🔥 Get next ID
  const lastMint = await Mints.findOne({
    order: [["id", "DESC"]],
  });

  const nextId = lastMint ? lastMint.id + 1 : 1;

  console.log("🆕 Next Mint ID:", nextId);

  const character = await Characters.findOne({
    where: { id: nextId },
  });

  if (!character) {
    throw new APIError(409, { message: "No characters left to mint" });
  }

  const items = [
    character.weapon,
    character.helmet,
    character.armor,
    character.guard,
  ];

  const stats = [
    character.perfection,
    character.atk,
    character.def,
    character.hp,
  ];


  await Mints.create({
    tokenId: character.tokenId,
    contractTokenId: null,
    characterId: nextId,
    owner,
    source: "backend",
    txHash,
  });

  let contractTokenId;

  try {
    contractTokenId = await mintCharacter(
      owner,
      nextId,
      items,
      stats
    );
  } catch (err) {
    console.error("Mint failed:", err);


    await Mints.destroy({ where: { txHash } });

    throw new APIError(500, { message: "On-chain mint failed" });
  }


  await Mints.update(
    { contractTokenId: contractTokenId.toString() },
    { where: { txHash } }
  );

  return {
    tokenId: character.tokenId,
    contractTokenId: contractTokenId.toString(),
    owner,
    imageUrl: `${config.server_url}/images/${character.tokenId}.png`,
  };
};