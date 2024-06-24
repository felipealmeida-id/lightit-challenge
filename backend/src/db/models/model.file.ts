import { Column, Entity } from 'typeorm';
import { BaseModel } from './model.base';

@Entity()
export class PlatformFile extends BaseModel {
  @Column()
  name: string;

  @Column({ type: 'blob' })
  file: Buffer;

  @Column()
  fileName: string;

  @Column()
  mimetype: string;
}
