import { Column, Entity, ManyToOne } from 'typeorm';
import { PlatformFile } from './model.file';
import { BaseModel } from './model.base';

@Entity()
export class Patient extends BaseModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  documentPhotoId: number;

  @ManyToOne(() => PlatformFile)
  documentPhoto: PlatformFile | null;
}
