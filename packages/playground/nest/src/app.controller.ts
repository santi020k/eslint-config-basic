import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller()

export class AppController {
  @ApiOkResponse({ description: 'Hello world' })
  @Get()
  getHello(): string {
    // Just return the greeting
    return 'Hello World!'
  }
}
