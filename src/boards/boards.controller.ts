import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { GetUser } from 'src/auth/get-user.decorater'
import { User } from 'src/auth/user.entity'

@Controller('boards')
@UseGuards(AuthGuard()) // 로그인된(인증된) 사용자만 접근 가능
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards()
  }

  @Get('/my')
  getMyBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`)
    return this.boardsService.getMyBoards(user)
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoard: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoard)}`
    )
    return this.boardsService.createBoard(createBoard, user)
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id, @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user)
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, status)
  }
}
