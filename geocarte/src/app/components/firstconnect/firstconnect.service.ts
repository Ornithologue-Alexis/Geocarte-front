import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class FirstconnectService {

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    this.http.get('http://localhost:8080/utilisateur/').subscribe(data => {
      console.log(data);
    });
  }

}
