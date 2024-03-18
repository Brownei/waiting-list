import { z } from 'zod';
import { sequelize } from '../utils/db';
import { DataTypes, Model } from 'sequelize';

const waitingListSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string(),
  country: z.string(),
});
export type WaitingListType = z.infer<typeof waitingListSchema>;

const WaitingList = sequelize.define<Model<WaitingListType>>('waiting-list', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
},
);

export default WaitingList;