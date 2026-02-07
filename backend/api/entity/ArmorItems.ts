import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface ArmorItemAttributes {
  id: number;
  original_ids: number;
  slot: string;
  rarity_tier: number;
  rarity_name: string;
  descriptor: string;
  file_name: string;
}

export interface ArmorItemCreationAttributes
  extends Optional<ArmorItemAttributes, "id"> {}

export class ArmorItem
  extends Model<ArmorItemAttributes, ArmorItemCreationAttributes>
  implements ArmorItemAttributes
{
  public id!: number;
  public original_ids!: number;
  public slot!: string;
  public rarity_tier!: number;
  public rarity_name!: string;
  public descriptor!: string;
  public file_name!: string;
}

ArmorItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    original_ids: DataTypes.INTEGER,
    slot: DataTypes.STRING,
    rarity_tier: DataTypes.INTEGER,
    rarity_name: DataTypes.STRING,
    descriptor: DataTypes.STRING,
    file_name: DataTypes.STRING
  },
  {
    sequelize,
    tableName: "armor_items",
    timestamps: false
  }
);
