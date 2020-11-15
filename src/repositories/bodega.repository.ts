import {DefaultCrudRepository} from '@loopback/repository';
import {Bodega, BodegaRelations} from '../models';
import {ConnDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BodegaRepository extends DefaultCrudRepository<
  Bodega,
  typeof Bodega.prototype.id,
  BodegaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Bodega, dataSource);
  }
}
