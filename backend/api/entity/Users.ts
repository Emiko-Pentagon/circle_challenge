import {
    DataTypes,
    Model,
    Optional
  } from "sequelize";
  import crypto from "crypto";
  import { sequelize } from "../config/sequelize";
  
  export const typeOfUsers = ["owner"] as const;
  export type TypeOfUser = typeof typeOfUsers[number];
  
  export const oAuthKinds = ["google", "efc"] as const;
  export type OAuthKind = typeof oAuthKinds[number];
  
  export interface AuthToken {
    accessToken?: string;
    refreshToken?: string;
    kind?: OAuthKind;
  }
  
  export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password?: string | null;
    address: string;
    isActive: boolean;
    google?: string | null;
    typeOfUser: TypeOfUser;
    accessToken?: string | null;
    refreshToken?: string | null;
    tokenKind?: OAuthKind | null;
    lastLogin?: string | null;
    profilePic?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}
  
  export class Users
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public username!: string;
    public password!: string | null;
    public address!: string;
    public isActive!: boolean;
    public google!: string | null;
    public typeOfUser!: TypeOfUser;
    public accessToken!: string | null;
    public refreshToken!: string | null;
    public tokenKind!: OAuthKind | null;
    public lastLogin!: string | null;
    public profilePic!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** === Virtual: fullName === */
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  
    /** === Method: gravatar === */
    gravatar(size: number = 200): string {
      const emailHash = this.username
        ? crypto.createHash("md5").update(this.username).digest("hex")
        : "";
      return `https://gravatar.com/avatar/${emailHash}?s=${size}&d=retro`;
    }
  }
  
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      google: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeOfUser: {
        type: DataTypes.ENUM(...typeOfUsers),
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tokenKind: {
        type: DataTypes.ENUM(...oAuthKinds),
        allowNull: true,
      },
      lastLogin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      modelName: "users",
    }
  );
  