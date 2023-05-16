import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { FirebaseService } from './firebase.service';
import { User } from 'src/entity/User';
import { async } from 'rxjs';
import { responseDto } from 'src/dto/respons.dto';

@Controller('firebase')
export class FirebaseController {
  @Inject(FirebaseService)
  private readonly firebaseService: FirebaseService;

  @MessagePattern('firebase.user.add')
  async readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const user = new User();
    user.fullName = message.value.name;
    user.id = message.value.email;
    user.age = message.value.age;

    const response = new responseDto();
    response.data = '';
    response.error = '';
    try {
      const resDocument = await this.firebaseService.addData(user);
      response.data = resDocument;
      return JSON.stringify(response);
    } catch (error) {
      console.log(error.message);
      response.error = error.message;
      return JSON.stringify(response);
    }
  }

  @MessagePattern('firebase.user.get')
  async getUsers(@Payload() message: any, @Ctx() context: KafkaContext) {
    const response = new responseDto();
    response.data = '';
    response.error = '';
    try {
      const resDocument = await this.firebaseService.getUsers();
      response.data = resDocument;
      return JSON.stringify(response);
    } catch (error) {
      console.log(error.message);
      response.error = error.message;
      return JSON.stringify(response);
    }
  }

  @MessagePattern('firebase.user.get.id')
  async getUsersId(@Payload() message: any, @Ctx() context: KafkaContext) {
    const response = new responseDto();
    response.data = '';
    response.error = '';
    try {
      const resDocument = await this.firebaseService.getUsersById(
        message.value.id,
      );
      response.data = resDocument;
      return JSON.stringify(response);
    } catch (error) {
      console.log(error.message);
      response.error = error.message;
      return JSON.stringify(response);
    }
  }

  @MessagePattern('firebase.user.update')
  async updateUsers(@Payload() message: any, @Ctx() context: KafkaContext) {
    const user = new User();
    user.fullName = message.value.name;
    user.id = message.value.id;
    user.age = message.value.age;

    const response = new responseDto();
    response.data = '';
    response.error = '';
    try {
      const resDocument = await this.firebaseService.updateUser(user);
      response.data = resDocument;
      return JSON.stringify(response);
    } catch (error) {
      console.log(error.message);
      response.error = error.message;
      return JSON.stringify(response);
    }
  }
}
