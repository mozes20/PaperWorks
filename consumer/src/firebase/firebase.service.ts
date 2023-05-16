import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { Collection, getRepository } from 'fireorm';
import { User } from 'src/entity/User';

const serviceAccount = require('../../paperworks-3cffa-668cd6c6ba9c.json');

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });

    const firestore = admin.firestore();
    fireorm.initialize(firestore);
  }

  async getUsers() {
    const userCollection = getRepository(User);
    const userDocument = await userCollection.find();
    return userDocument;
  }

  async getUsersById(id: string) {
    const userCollection = getRepository(User);
    const userDocument = await userCollection.findById(id);
    return userDocument;
  }

  async addData(user: User) {
    const userCollection = getRepository(User);
    const userDocument = await userCollection.create(user);
    return userDocument;

    //const mySuperTodoDocument = await todoRepository.findById(todoDocument.id); // Read todo
    //await todoRepository.update(mySuperTodoDocument); // Update todo
    //await todoRepository.delete(mySuperTodoDocument.id); // Delete todo
  }

  async updateUser(user: User) {
    const userCollection = getRepository(User);
    const userDocument = await userCollection.update(user);
    return userDocument;

    //const mySuperTodoDocument = await todoRepository.findById(todoDocument.id); // Read todo
    //await todoRepository.update(mySuperTodoDocument); // Update todo
    //await todoRepository.delete(mySuperTodoDocument.id); // Delete todo
  }
}
