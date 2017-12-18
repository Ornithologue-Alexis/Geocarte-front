import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class SignupService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: Http) {
  }


  /*
  getUserInfo(): Promise<User> {

    return this.http.get(this.baseUrl + '/utilisateur/')
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

  */
}
