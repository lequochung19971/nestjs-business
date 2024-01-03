import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { MimeTypes } from '../enums/mine-types.enum';
import { FileExtension } from '../enums/file-extension.enum';

@Entity()
export class File extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'bigint',
  })
  size: number;

  @Column({
    type: 'enum',
    enum: FileExtension,
  })
  extension: FileExtension;

  @Column({
    type: 'varchar',
  })
  path: string;

  @Column({
    type: 'enum',
    enum: MimeTypes,
  })
  mimeType: MimeTypes;
}
