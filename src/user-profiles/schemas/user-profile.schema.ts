import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserProfile {
  @Prop()
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ default: null })
  profileImgUrl: string;
}

export type UserProfileDocument = UserProfile & Document;

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

UserProfileSchema.index({ userId: 1 });
