import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class FirstconnectService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  getUser(login: string, password: string): Promise<User> {

    let params: URLSearchParams = new URLSearchParams();
    params.append('login', login);
    params.append('pwd', password);

    return this.http.get(this.baseUrl + '/utilisateur/', {search: params})
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
