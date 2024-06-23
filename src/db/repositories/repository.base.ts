import { DeepPartial, EntityManager, EntityTarget, FindOneOptions, Repository } from 'typeorm';
import { DbSource } from '../source';
import { BaseModel } from '../models/model.base';

export class BaseRepository<T extends BaseModel> {
  repository: Repository<T>;

  entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
    this.repository = DbSource.getRepository(entity);
  }

  protected getRepository = (transaction?: EntityManager) =>
    transaction?.getRepository(this.entity) || this.repository;

  getById = (id: number) => this.getRepository().findOne({ where: { id } } as FindOneOptions<T>);

  update = (id: number, update: DeepPartial<T>, transaction?: EntityManager) =>
    this.getRepository(transaction).save({ ...update, id });

  save = (entities: DeepPartial<T>[], transaction?: EntityManager) =>
    this.getRepository(transaction).save(entities);

  static runInTransaction = async <R>(toRun: (transaction: EntityManager) => Promise<R>) => {
    const qr = DbSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    const transaction = qr.manager;
    try {
      const result = await toRun(transaction);
      await qr.commitTransaction();
      return result;
    } catch (error) {
      await qr.rollbackTransaction();
      throw error;
    } finally {
      await qr.release();
    }
  };
}
