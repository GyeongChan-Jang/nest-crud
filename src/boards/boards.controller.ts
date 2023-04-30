import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { Board } from './board.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('boards')
@UseGuards(AuthGuard()) // 로그인된(인증된) 사용자만 접근 가능
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards()
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoard: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoard)
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id)
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, status)
  }
}
