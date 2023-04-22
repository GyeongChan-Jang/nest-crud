import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
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
  // 파이프를 핸들러 레벨에서 생성
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    console.log(createBoardDto)

    return this.boardsService.createBoard(createBoardDto)
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
