import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({ description: 'Hello world' })
  getHello(): string {
    // eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
    var x = 1

    return 'Hello World!'
  }
}
