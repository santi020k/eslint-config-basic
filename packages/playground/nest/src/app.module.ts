import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
  imports: [],
  providers: []
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
