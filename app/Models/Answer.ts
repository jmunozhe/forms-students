import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { HasMany } from '@ioc:Adonis/Lucid/Relations'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() public answer: string
  @column() public is_correct:boolean
  @column() public question_id: number
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Question,{
    localKey: 'question_id',
    foreignKey: 'id',
  })
  public answerQuestion:HasMany<typeof Question>
}
