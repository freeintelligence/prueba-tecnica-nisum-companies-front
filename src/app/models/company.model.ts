import {
  capitalizeEachWord,
  firstLetterToUpperCase,
  getRandomString,
  strToWebsite,
} from '../helpers/helpers';

export interface CompanyProperties {
  internalId?: string;
  country: string;
  industry: string;
  linkedInUrl: string;
  locality: string;
  name: string;
  region: string;
  size: string;
  website: string;
  internalWebsite?: string;
}

export class Company {
  internalId!: string;
  country!: string;
  industry!: string;
  linkedInUrl!: string;
  locality!: string;
  name!: string;
  region!: string;
  size!: string;
  website!: string;
  internalWebsite!: string;

  constructor(properties: CompanyProperties) {
    Object.assign(this, properties);

    this.fixProperties();
  }

  fixProperties() {
    this.internalId = this.internalId ?? getRandomString();
    this.country = capitalizeEachWord(this.country);
    this.industry = firstLetterToUpperCase(this.industry);
    this.locality = capitalizeEachWord(this.locality);
    this.name = this.name?.toUpperCase();
    this.region = capitalizeEachWord(this.region);
    this.internalWebsite = strToWebsite(this.website);
  }
}
