import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

/**
 * @title Dialog Overview
 */

@Injectable()
export class HeaderService {

  private baseUrl = 'http://localhost:8080/geocarte/api';

  constructor(private http: Http) {}

  getCommunes():  Promise<Commune[]> {
    return this.http.get(this.baseUrl + '/communes/')
      .toPromise()
      .then(response => response.json() as Commune[])
      .catch(this.handleError);
  }


  getTypeMonuments():  Promise<TypeMonument[]> {
    return this.http.get(this.baseUrl + '/typeMonument/')
      .toPromise()
      .then(response => response.json() as TypeMonument[])
      .catch(this.handleError);
  }

  getEditeurs(): Promise<Editeur[]> {
    return this.http.get(this.baseUrl + '/editeurUtilises/')
      .toPromise()
      .then(response => response.json() as Editeur[])
      .catch(this.handleError);
  }

  getLegendes(): Promise<string[]> {
    return this.http.get(this.baseUrl + '/legendes/')
      .toPromise()
      .then(response => response.json() as Editeur[])
      .catch(this.handleError);
  }

  getLegendesWithBeginning(debut : string): Promise<string[]> {
    return this.http.get(this.baseUrl + '/legendes/?legende=' + debut)
      .toPromise()
      .then(response => response.json() as String[])
      .catch(this.handleError);
  }

  getCommunesWithBeginning(debut : string): Promise<Commune[]> {
    return this.http.get(this.baseUrl + '/communeUtilisees/?nom=' + debut)
      .toPromise()
      .then(response => response.json() as Commune[])
      .catch(this.handleError);
  }

  searchCartePostale(commune, typemonument, editeur, legende): Promise<VarianteCarte[]> {
    if(commune === null) commune ='';
    if(typemonument === null) typemonument ='';
    if(editeur === null) editeur ='';
    if(legende === null) legende ='';

    console.log((this.baseUrl + '/varianteCarte/?typemonument'+typemonument+'=&editeur'+editeur+'=&commune'+commune+'=&legende='+encodeURIComponent(legende)));
    return this.http.get((this.baseUrl + '/varianteCarte/?typemonument='+encodeURIComponent(typemonument)+'&editeur='+encodeURIComponent(editeur)+'&commune='+encodeURIComponent(commune)+'&legende='+encodeURIComponent(legende)))
      .toPromise()
      .then(response => response.json() as VarianteCarte[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }



}
