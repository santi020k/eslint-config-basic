import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({ description: 'Hello world' })
  getHello(): string {
    return 'Hello World!'
  }
}
