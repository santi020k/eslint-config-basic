/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided -- registered in AppModule; typed-plugin cannot resolve the module graph when linting from the monorepo root */
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
