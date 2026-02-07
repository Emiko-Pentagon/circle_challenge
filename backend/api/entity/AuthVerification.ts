import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Users } from './Users';

export class AuthVerification extends Model {
  public id!: number;
  public userId!: number;
  public code!: string;
  public expiryDate!: string;
  public isVerified!: boolean;
  public verifiedAt?: string;
}

AuthVerification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    code: DataTypes.STRING,
    expiryDate: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifiedAt: DataTypes.STRING,
  },
  { sequelize, modelName: 'auth_verifications', tableName: 'auth_verifications', timestamps: true }
);

AuthVerification.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(AuthVerification, { foreignKey: 'userId' });
