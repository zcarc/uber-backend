import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Chat from "./Chat";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Chat, chat => chat.messages)
  chat: Chat;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Message;
