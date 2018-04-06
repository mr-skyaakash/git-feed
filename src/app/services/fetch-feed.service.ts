import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class FetchFeedService {

  constructor(private http: Http) { }

  // fetching the list of public gists
  getRepoList(): Observable<any[]> {
    return this.http.get('https://api.github.com/gists/public').map((res) => res.json());
  }

}
