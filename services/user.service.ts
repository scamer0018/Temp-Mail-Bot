import { usersCollection } from "../database/client.ts";
import type { User } from "../models/user.ts";

export const UserService = {
  async findOrCreate(userId: number): Promise<User> {
    let user = await usersCollection.findOne({ user_id: userId });
    if (!user) {
      const newUser: Partial<User> = {
        user_id: userId,
        email: "",
        email_token: "",
        idnum: "",
        created_at: new Date(),
      };
      await usersCollection.insertOne(newUser);
      user = await usersCollection.findOne({ user_id: userId });
    }
    return user as User;
  },

  async updateEmail(userId: number, email: string, emailToken: string): Promise<void> {
    await usersCollection.updateOne(
      { user_id: userId },
      { $set: { email, email_token: emailToken, updated_at: new Date() } }
    );
  },

  async resetSession(userId: number): Promise<void> {
    await usersCollection.updateOne(
      { user_id: userId },
      { $set: { email: "", email_token: "", idnum: "", updated_at: new Date() } }
    );
  },

  async countUsers(): Promise<number> {
    return await usersCollection.countDocuments();
  },
};