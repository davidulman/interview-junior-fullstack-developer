import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

export interface CityData {
  cities: {
    cityName: string;
    count: number;
    uuid: string;
  }[];
  page: string;
  currentPage: number;
  maxPages: number;
  totalResults: number;
  totalResultsInThisPage: number;
}

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent {
  cityData: CityData | null = null;
  cityName: string | undefined;
  isLoading: boolean = false;
  isFetching: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMsg: {
    message: string;
    statusCode: number;
  } | null = null;
  currentPage: number = 1;
  maxPages: number = 0;

  constructor(private http: HttpClient, private errDialog: MatDialog) {}

  searchCity() {
    if (this.cityName) {
      const apiUrl = 'http://localhost:3000/city';
      const body = {
        cityName: this.cityName,
        currentPage: this.currentPage,
      };
      this.isLoading = true;
      this.isFetching = true;

      this.http.post(apiUrl, body).subscribe(
        (res) => {
          this.onSuccess(res as CityData);
        },
        (err) => {
          this.onError(err);
        }
      );
    }
  }

  private onSuccess(res: CityData) {
    this.cityData = res;
    this.maxPages = res.maxPages;
    this.isSuccess = true;
    this.isLoading = false;
    this.isFetching = false;
  }

  private onError(err: any) {
    this.isError = true;
    this.isLoading = false;
    this.isFetching = false;
    this.errorMsg = {
      message: err.error.message,
      statusCode: err.status,
    };

    this.errDialog.open(ErrorModalComponent, {
      data: {
        message: this.errorMsg.message,
        statusCode: this.errorMsg.statusCode,
      },
    });
  }

  nextPage() {
    if (this.currentPage === this.maxPages) {
      return;
    }
    this.currentPage++;
    this.searchCity();
  }

  prevPage() {
    this.currentPage--;
    this.searchCity();
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.cityData?.totalResults === this.cityData?.cities.length;
  }
}
