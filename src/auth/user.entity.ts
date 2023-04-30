import { Board } from 'src/boards/board.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany((type) => Board, (board) => board.user, { eager: true }) // eager: true이면 user정보를 가져오면 board 정보도 같이 조회됨
  boards: Board[]
}
