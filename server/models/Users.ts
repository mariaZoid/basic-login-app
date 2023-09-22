import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes
} from 'sequelize';
import {sequelize} from './sequelize';

import { z } from 'zod';
export type UserSafeDto = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
};

export declare const EmailSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const PasswordSchema: z.ZodType<string>;
export declare const UserSafeDtoSchema: z.ZodType<UserSafeDto>;

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare passHash: string | null;
    declare firstName: string;
    declare lastName: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    toSafeDto(): UserSafeDto {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        };
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passHash: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'pass_hash',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'users',
        underscored: true,
        sequelize,
    }
);
