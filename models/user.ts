import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

export interface User {
  _id?: ObjectId;
  user_id: number;
  email: string;
  email_token: string;
  idnum: string;
  created_at?: Date;
  updated_at?: Date;
}