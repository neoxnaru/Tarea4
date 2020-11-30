import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Turnos} from '../models';
import {TurnosRepository} from '../repositories';

export class TurnosController {
  constructor(
    @repository(TurnosRepository)
    public turnosRepository: TurnosRepository,
  ) { }

  @post('/turnos', {
    responses: {
      '200': {
        description: 'Turnos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Turnos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {
            title: 'NewTurnos',
            exclude: ['id'],
          }),
        },
      },
    })
    turnos: Omit<Turnos, 'id'>,
  ): Promise<Turnos> {
    return this.turnosRepository.create(turnos);
  }

  @get('/turnos/count', {
    responses: {
      '200': {
        description: 'Turnos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Turnos) where?: Where<Turnos>,
  ): Promise<Count> {
    return this.turnosRepository.count(where);
  }

  @get('/turnos', {
    responses: {
      '200': {
        description: 'Array of Turnos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Turnos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Turnos) filter?: Filter<Turnos>,
  ): Promise<Turnos[]> {
    return this.turnosRepository.find(filter);
  }

  @patch('/turnos', {
    responses: {
      '200': {
        description: 'Turnos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {partial: true}),
        },
      },
    })
    turnos: Turnos,
    @param.where(Turnos) where?: Where<Turnos>,
  ): Promise<Count> {
    return this.turnosRepository.updateAll(turnos, where);
  }

  @get('/turnos/{id}', {
    responses: {
      '200': {
        description: 'Turnos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Turnos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Turnos, {exclude: 'where'}) filter?: FilterExcludingWhere<Turnos>
  ): Promise<Turnos> {
    return this.turnosRepository.findById(id, filter);
  }

  @patch('/turnos/{id}', {
    responses: {
      '204': {
        description: 'Turnos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {partial: true}),
        },
      },
    })
    turnos: Turnos,
  ): Promise<void> {
    await this.turnosRepository.updateById(id, turnos);
  }

  @put('/turnos/{id}', {
    responses: {
      '204': {
        description: 'Turnos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() turnos: Turnos,
  ): Promise<void> {
    await this.turnosRepository.replaceById(id, turnos);
  }

  @del('/turnos/{id}', {
    responses: {
      '204': {
        description: 'Turnos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.turnosRepository.deleteById(id);
  }

  //Ejecutar procedimiento spCumplimientoTurnos

  @get('/turnos/cumplimiento/{orden}')
  async cumplimiento(
    @param.path.number('orden') ordenId: number
  ): Promise<any> {
    return await this.getDatos(ordenId);
  }

  async getDatos(parametro: number) {
    return await this.turnosRepository
      .dataSource
      .execute(`EXEC pro.spCumplimientoTurnos ${parametro}`);
  }

  @get('/turnos/vista1/')
  async vista1(

  ): Promise<any> {
    let datos: any[] = await this.getVista();
    return datos;
  }

  async getVista() {
    return await this.turnosRepository.dataSource.execute(`SELECT *  FROM pro.vProductosMaquina`);
    // EXEC spProcedure1 ${par1}
  }

}
