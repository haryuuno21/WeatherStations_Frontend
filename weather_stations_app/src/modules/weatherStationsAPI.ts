export interface IStation {
    id: number;
    short_name: string;
    full_name?: string;
    photo_url?: string;
    address?: string;
    chief_fio?: string;
    phone_number?: string;
    sea_level: number;
  }
  export interface IStationsResult {
    current_report?: number;
    stations_count: number;
    stations: IStation[];
  }
  
  export const getStationsByName = async (name = ""): Promise<IStationsResult> => {
    return fetch(`http://localhost:3000/api/stations/?station_name=${name}`).then(
      (response) => response.json()
    );
  };
  
  export const getStationById = async (
    id: number | string
  ): Promise<IStation> => {
    return fetch(`http://localhost:3000/api/stations/${id}`).then(
      (response) => response.json()
    );
  };