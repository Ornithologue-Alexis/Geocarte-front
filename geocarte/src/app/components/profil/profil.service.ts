import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class ProfilService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  getUserInfo(id: string): Promise<User> {

    return this.http.get(this.baseUrl + '/utilisateur/' + id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateUserInfo(id: string, email: string, password: string, nom: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      'email': email,
      'id': id,
      'motdepasse': password,
      'nom': nom
    };
    let body = JSON.stringify(changes);
    return this.http.put(this.baseUrl + '/utilisateur/' + id, body, options ).map((res: Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
