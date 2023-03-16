import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() public student_id:string
  @column() public answer_id: number
  @column() public state: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Answer,{
    localKey: 'answer_id',
    foreignKey: 'id',
  })
  public formAnswer: HasMany<typeof Answer>

  @hasMany(()=> User,{
    localKey: 'student_id',
    foreignKey: 'id',
  })
  public formStudent: HasMany<typeof User>
}
