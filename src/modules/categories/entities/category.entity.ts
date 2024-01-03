import { BaseEntity } from 'src/entities/base.entity';
import { File } from 'src/modules/files/entities/file.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @ManyToMany(() => File)
  @JoinTable()
  media: File[];
}
