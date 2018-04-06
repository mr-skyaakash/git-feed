import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FetchFeedService
} from '../../services/fetch-feed.service';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {
  Feed
} from './feed.interface';
import 'rxjs/add/operator/share';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit, OnDestroy {

  // repository details

  repoList: Observable < Array < Feed >> ;
  repoListCopy: Observable < Array < Feed >> ;
  repoLength: number;

  // pagination variables

  _pageLimit = 10;
  private initPage = -this._pageLimit;
  private _totalLength: number;

  // toggle pagination view or sorted view
  showPage = true;

  // to hold the subscription
  repoListSusbcription: Subscription;

  constructor(private httpService: FetchFeedService) {}

  ngOnInit() {
    try {
      // fetching the Observable from service
      this.repoList = this.httpService.getRepoList().share();
      this.repoListSusbcription = this.repoList.subscribe(repoList => {
        this.repoLength = repoList.length;
      });

      // getting total length
      this._totalLength = this.repoLength;

      // creating a copy of the repository list
      this.repoListCopy = this.repoList;

      // mapping the Observable for pagination
      this.repoList = this.repoListCopy.map(repo => repo.slice(0, this.initPage + this._pageLimit));
      this.initPage += this._pageLimit;
    } catch {
      console.log('Initialization Error');
    }
  }

  filter(owner: string = '', desc: string = '') {
    try {
      // disabling pagination
      this.showPage = false;

      // filtering according to input params
      this.repoList = this.repoListCopy.map(list => list.filter(repo => {
        return repo.description !== null ? repo.owner.login.includes(owner) &&
          repo.description.includes(desc) : desc === '' ? repo.owner.login.includes(owner) : false;
      }));
    } catch {
      console.log('Error in Data Filtering');
    }
  }

  sortByName() {
    try {
      // disbaling pagination
      this.showPage = false;

      this.repoList = this.repoListCopy.map(repo => repo.sort((a, b) => {
        // comparing dates

        const dateA = a.updated_at;
        const dateB = b.updated_at;
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }

        // if dates are equal
        return 0;
      }));
    } catch {
      console.log('Error in Sorting');
    }
  }

  paginate(val) {
    try {
      // if BACK button is pressed -> '0'
      if (val === 0) {
        // checking if back pagination is possible
        if (!(this.initPage - this._pageLimit < 0)) {
          this.repoList = this.repoListCopy.map(repo => {
            // paginating by generating a new set of elements ( SLICE function )
            return repo.slice(this.initPage, this.initPage + this._pageLimit);
          });
          this.initPage -= this._pageLimit;
        }
      } else { // if NEXT button is pressed -> '1'
      // checking if forward pagination possible
        if (!(this.initPage + this._pageLimit > this.repoLength)) {
          // paginating by generating a new set of elements ( SLICE function )
          this.repoList = this.repoListCopy.map(repo => repo.slice(this.initPage, this.initPage + this._pageLimit));
          this.initPage += this._pageLimit;
        }
      }
    } catch {
      console.log('Error in Pagination');
    }
  }

  showInPage() {
    try {
      // initializing pagination
      this.showPage = true;
      this.initPage = 0;
      this.repoList = this.repoListCopy.map(repo => repo.slice(this.initPage, this.initPage + this._pageLimit));
    } catch {
      console.log('Error in Toggling from Sort to Pagination');
    }
  }

  ngOnDestroy() {
    // unsubscribing at the time of component destruction
    this.repoListSusbcription.unsubscribe();
  }

}
