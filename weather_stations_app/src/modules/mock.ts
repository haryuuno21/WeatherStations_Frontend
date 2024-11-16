import { IStationsResult } from "./weatherStationsAPI";

export const STATIONS_MOCK: IStationsResult = {
    stations_count: 0,
    current_report: undefined,
    stations:[
        {
            id:0,
            photo_url:'https://haryuuno21.github.io/WeatherStations_Frontend/0.png',
            short_name:'ВДНХ',
            full_name:'Метеостанция ВДНХ',
            address:'129223, г.Москва, ВДНХ, Проспект Мира, вл.119,стр.423',
            chief_fio:'Никитина Светлана Александровна',
            phone_number:'8-499-760-36-95',
            sea_level:147,
        },
        {
            id:1,
            photo_url:'https://haryuuno21.github.io/WeatherStations_Frontend/1.png',
            short_name:'Балчуг',
            full_name:'Метеостанция Балчуг',
            address:'115184, г.Москва, Средне-Овчинникосвкий пер., д.1, стр.4',
            chief_fio:'Ревкова Татьяна Геннадьевна',
            phone_number:'8-495-953-42-89',
            sea_level:124,
        },
        {
            id:2,
            photo_url:'https://haryuuno21.github.io/WeatherStations_Frontend/2.png',
            short_name:'Тушино',
            full_name:'Метеостанция Тушино',
            address:'123481, г.Москва, пос.Новобутаково, д.39, стр.1',
            chief_fio:'Зинкина Марина Васильевна',
            phone_number:'8-495-571-52-21',
            sea_level:167,
        },
        {
            id:3,
            photo_url:'https://haryuuno21.github.io/WeatherStations_Frontend/3.png',
            short_name:'Михайловское',
            full_name:'Метеостанция Михайловское',
            address:'142020, г.Москва, поселение Вороновское, д.Голохвастово, д.2г',
            chief_fio:'–',
            phone_number:'8-495-850-60-83',
            sea_level:192,
        }
    ],
}

export const DEFAULT_PHOTO_URL: string = "https://haryuuno21.github.io/WeatherStations_Frontend/no_photo.png"