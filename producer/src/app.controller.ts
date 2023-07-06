import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import express, { Request, Response } from 'express';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { User } from './dto/User';
import { responseDto } from './dto/respons.dto';
import { async } from 'rxjs';
import util from 'util';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('any_name_i_want') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['user.add'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    ['user.get'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    ['user.get.id'].forEach((key) =>
      this.client.subscribeToResponseOf(`${key}`),
    );
    ['user.update'].forEach((key) =>
      this.client.subscribeToResponseOf(`${key}`),
    );
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Post('User')
  firebaseAddUser(@Body(ValidationPipe) body: User, @Res() res: Response) {
    const microRes = this.client.send('user.add', JSON.stringify(body));
    microRes.subscribe((microData: responseDto) => {
      if (microData.error === '') {
        res.status(HttpStatus.CREATED).json(microData);
      } else {
        res.status(HttpStatus.CONFLICT).json(microData);
      }
    });
  }

  @Put('User')
  firebaseUpdateUser(@Body() body: User, @Res() res: Response) {
    const microRes = this.client.send('user.update', JSON.stringify(body));
    microRes.subscribe((microData: responseDto) => {
      if (microData.error === '') {
        res.status(HttpStatus.CREATED).json(microData);
      } else {
        res.status(HttpStatus.CONFLICT).json(microData);
      }
    });
  }

  @Get('User')
  firebaseGetUsers(@Body() body: User, @Res() res: Response) {
    const microRes = this.client.send('user.get', JSON.stringify(body));
    microRes.subscribe((microData: responseDto) => {
      if (microData.error === '') {
        res.status(HttpStatus.OK).json(microData);
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(microData);
      }
    });
  }
  @Get('UserId')
  firebaseGetUsersById(
    @Body(ValidationPipe) body: string,
    @Res() res: Response,
  ) {
    const microRes = this.client.send('user.get.id', JSON.stringify(body));
    microRes.subscribe((microData: responseDto) => {
      if (microData.error === '') {
        res.status(HttpStatus.OK).json(microData);
      } else {
        res.status(HttpStatus.CONFLICT).json(microData);
      }
    });
  }
}
