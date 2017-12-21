import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class SignupService {

  baseUrl = 'http://localhost:8080/geocarte/api';

  constructor(private http: Http) {
  }

  createUser(email: string, password: string, nom: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      'email': email,
      'mdp': password,
      'nom': nom
    };
    let body = JSON.stringify(changes);
    return this.http.post(this.baseUrl + '/utilisateur/', body, options ).map((res: Response) => res.json());
  }
}
