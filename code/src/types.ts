type Location = {
    lat: number;
    lon: number;
  };
  
  type City = {
    name: string;
    legacy_id: number;
    id: string;
    slug: string;
  };
  
  type Country = {
    code: string;
    name: string;
  };
  
export type Place = {
    zipcode: string;
    score: number;
    country: Country;
    address: string;
    city: City;
    name: string;
    legacy_id: number;
    location: Location;
    id: string;
    importance_order: number;
    slug: string;
  };
  

