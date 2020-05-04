import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity("lista")
export class Lista {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ name: "descricao" })
  descricao: string;
  
  @Column({ name: "quantidade" })
  quantidade: number;
}
