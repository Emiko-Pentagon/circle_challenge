import {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import crypto from "crypto";
import { sequelize } from "../config/sequelize";


export interface CharacterAttributes {
  id: number;
  characterId: number;
  tokenId: string;
  owner?: string | null;
  weapon: number;
  helmet: number;
  armor: number;
  guard: number;
  perfection: number;
  atk: number;
  def: number;
  hp: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CharacterCreationAttributes
  extends Optional<CharacterAttributes, "id" | "createdAt" | "updatedAt"> { }

export class Characters
  extends Model<CharacterAttributes, CharacterCreationAttributes>
  implements CharacterAttributes {
  public id!: number;
  public characterId!: number;
  public tokenId!: string;
  public owner!: string | null;
  public weapon!: number;
  public helmet!: number;
  public armor!: number;
  public guard!: number;
  public perfection!: number;
  public atk!: number;
  public def!: number;
  public hp!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Characters.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weapon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    helmet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    armor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guard: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    perfection: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "characters",
    timestamps: true,
    modelName: "characters",
  }
);
