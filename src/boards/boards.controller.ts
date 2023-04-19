import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { Board, BoardStatus } from './board.model'
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

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    console.log(id)

    return this.boardsService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    console.log(id)
    this.boardsService.deleteBoard(id)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus
  ) {
    this.boardsService.updateBoardStatus(id, status)
  }
}
