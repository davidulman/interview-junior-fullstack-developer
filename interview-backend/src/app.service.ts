import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  private cities = JSON.parse(readFileSync('../cities.json', 'utf8'));

  getCity(cityName: string, currentPage: number) {
    const maxResultsPerPage = 5;
    const city = cityName.toLowerCase();
    const filteredCities = this.cities.filter((c: { cityName: string }) =>
      c.cityName.toLowerCase().includes(city),
    );

    const start = currentPage - 1;
    const end = start + maxResultsPerPage;
    const maxPages = Math.ceil(filteredCities.length / maxResultsPerPage);
    const totalResultsInThisPage = filteredCities.slice(start, end).length;
    const totalResults = filteredCities.length;

    if (filteredCities.length === 0) {
      throw new HttpException(
        `No results found for ${cityName}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentPage > maxPages) {
      throw new HttpException(
        `Page ${currentPage} doesn't excites there are only ${maxPages} pages `,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      cities: filteredCities.slice(start, end),
      page: currentPage + '/' + maxPages,
      totalResultsInThisPage,
      totalResults,
    };
  }
}
