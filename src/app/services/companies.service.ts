import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import companiesJson from '../dummy/companies.json';
import {
  capitalizeEachWord,
  firstLetterToUpperCase,
  strToWebsite,
} from '../helpers/helpers';

export interface GetCompaniesFiltersInterface {
  database?: string;
  size?: string;
  industry?: string;
  locality?: string;
  region?: string;
  country?: string;
  page?: number;
}

export interface GetRawCompaniesResponseInterface {
  count: number;
  page: number;
  results: {
    country: string;
    industry: string;
    linkedin_url: string;
    locality: string;
    name: string;
    region: string;
    size: string;
    website: string;
  }[];
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private readonly http: HttpClient) {}

  getKeyByFilters(filters: GetCompaniesFiltersInterface) {
    return JSON.stringify(filters);
  }

  async getCompanies(
    filters: GetCompaniesFiltersInterface
  ): Promise<Company[]> {
    const rawCompanies = await this.getRawCompanies(filters);

    return this.rawCompaniesToCompaniesModel(rawCompanies);
  }

  async getRawCompanies(filters: GetCompaniesFiltersInterface) {
    if (environment.USE_DUMMY) {
      return companiesJson as unknown as GetRawCompaniesResponseInterface;
    }

    const key = this.getKeyByFilters(filters);
    const cachedCompanies = localStorage.getItem(key);

    if (cachedCompanies !== null) {
      return JSON.parse(cachedCompanies) as GetRawCompaniesResponseInterface;
    }

    const result = await firstValueFrom(
      this.http.post<GetRawCompaniesResponseInterface>(
        environment.API_URL,
        filters,
        {
          headers: {
            'x-rapidapi-key': environment.RAPIDAPI_KEY,
            'x-rapidapi-host': environment.RAPIDAPI_HOST,
          },
        }
      )
    );

    localStorage.setItem(key, JSON.stringify(result));

    return result;
  }

  rawCompaniesToCompaniesModel(
    rawCompanies: GetRawCompaniesResponseInterface
  ): Company[] {
    return rawCompanies.results.map((company) => ({
      country: capitalizeEachWord(company.country),
      industry: firstLetterToUpperCase(company.industry),
      linkedInUrl: company.linkedin_url,
      locality: capitalizeEachWord(company.locality),
      name: company.name?.toUpperCase(),
      region: capitalizeEachWord(company.region),
      size: company.size,
      website: company.website,
      internalWebsite: strToWebsite(company.website),
    }));
  }
}
