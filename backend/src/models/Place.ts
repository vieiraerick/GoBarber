import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Image from "./Image";

@Entity("places")
export default class Places {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => Image, (image) => image.place, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "place_id" })
  images: Image[];
}
