import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class MycardsService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  getUserCartes(id: string): Promise<any> {

    return this.http.get(this.baseUrl + '/carteUtilisateur/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
