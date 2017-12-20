import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class MycardsService {

  baseUrl = 'http://localhost:8080/geocarte/api';

  constructor(private http: Http) {
  }

  getUserCartes(id: string): Promise<any> {

    return this.http.get(this.baseUrl + '/carteUtilisateur/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /*
  updateCardInfo(idUser: string, idCommune: string, idEditeur: string, legende: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      'idCommune': email,
      'id': idUser,
      'motdepasse': password,
      'nom': nom
    };
    let body = JSON.stringify(changes);
    return this.http.put(this.baseUrl + '/utilisateur/' + id, body, options ).map((res: Response) => res.json());
  }
  */
  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
