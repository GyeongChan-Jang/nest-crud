import { Body, Controller, Get, Post } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { Board } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards()
  }

  @Post()
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
    console.log(CreateBoardDto)

    return this.boardsService.createBoard(CreateBoardDto)
  }
}
