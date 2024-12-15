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
    return fetch(`http://192.168.56.1:8000/stations/?station_name=${name}`).then(
      (response) => response.json()
    );
  };
  
  export const getStationById = async (
    id: number
  ): Promise<IStation> => {
    return fetch(`http://192.168.56.1:8000/stations/${id}/`).then(
      (response) => response.json()
    )
  };