import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface MintAttributes {
  id: number;
  tokenId: string;
  contractTokenId?: string | null; 
  characterId: number;
  owner: string;
  source?: string;
  txHash?: string | null;
  metadata?: object | null;
  createdAt?: Date;
}

export interface MintCreationAttributes extends Optional<MintAttributes, "id" | "txHash" | "metadata" | "source" | "createdAt"> {}

export class Mints extends Model<MintAttributes, MintCreationAttributes> implements MintAttributes {
  public id!: number;
  public tokenId!: string;
  public contractTokenId!: string | null;
  public characterId!: number;
  public owner!: string;
  public source!: string;
  public txHash!: string | null;
  public metadata!: object | null;
  public readonly createdAt!: Date;
}

Mints.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  tokenId: { type: DataTypes.STRING, allowNull: false },
  contractTokenId: { type: DataTypes.STRING, allowNull: true },
  characterId: { type: DataTypes.INTEGER, allowNull: false },
  owner: { type: DataTypes.STRING, allowNull: false },
  source: { type: DataTypes.STRING, allowNull: false, defaultValue: 'backend' },
  txHash: { type: DataTypes.STRING, allowNull: true },
  metadata: { type: DataTypes.JSON, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  sequelize,
  tableName: "mints",
  timestamps: false
});
