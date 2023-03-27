import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '@ss/auth';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private auth: AuthService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }


  @Post('/add-user-to-roles')
  async addUserToRole(@Body() data: { roles: string[], user: any }) {
      console.log(data)
      await this.auth.addUserToRoles(data.user, data.roles)
      console.log('success')
      return { result: 'success' }
  }
}
