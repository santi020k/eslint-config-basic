import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided -- playground: controller is registered in app.module.ts; plugin lacks full bootstrap graph
export class AppController {
  @Get()
  @ApiOkResponse({ description: 'Hello world' })
  getHello(): string {
    // eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
    var x = 1

    return 'Hello World!'
  }
}
