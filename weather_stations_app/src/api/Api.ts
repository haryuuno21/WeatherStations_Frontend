/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TemperatureReport {
  /** Status */
  status?: "Draft" | "Deleted" | "Formed" | "Completed" | "Rejected";
  /**
   * Report date
   * @format date
   */
  report_date?: string | null;
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date-time
   */
  completion_date?: string | null;
  /** Creator id */
  creator_id?: string;
  /** Moderator id */
  moderator_id?: string;
  /**
   * Average temperature
   * @min -2147483648
   * @max 2147483647
   */
  average_temperature?: number | null;
}

export interface StationReport {
  /**
   * Temperature
   * @min -2147483648
   * @max 2147483647
   */
  temperature?: number;
  /** Station id */
  station_id?: string;
  /** Short name */
  short_name?: string;
  /** Photo url */
  photo_url?: string;
}

export interface GETReportInfo {
  /**
   * Status
   * @minLength 1
   */
  status: string;
  /**
   * Report date
   * @format date
   */
  report_date?: string | null;
  /**
   * Creation date
   * @format date-time
   */
  creation_date: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date-time
   */
  completion_date?: string | null;
  /** Creator id */
  creator_id: number;
  /** Moderator id */
  moderator_id?: number | null;
  /** Average temperature */
  average_temperature?: number | null;
  stations: StationReport[];
}

export interface Station {
  /** ID */
  id?: number;
  /**
   * Short name
   * @minLength 1
   * @maxLength 50
   */
  short_name: string;
  /**
   * Full name
   * @minLength 1
   * @maxLength 100
   */
  full_name: string;
  /**
   * Photo url
   * @format uri
   * @maxLength 200
   */
  photo_url?: string | null;
  /**
   * Address
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * Chief fio
   * @minLength 1
   * @maxLength 100
   */
  chief_fio?: string | null;
  /**
   * Phone number
   * @minLength 1
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * Sea level
   * @min -2147483648
   * @max 2147483647
   */
  sea_level?: number;
}

export interface GETStations {
  /** Current report */
  current_report?: number;
  /**
   * Stations count
   * @default 0
   */
  stations_count?: number;
  stations: Station[];
}

export interface User {
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 255
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://0.0.0.0:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://0.0.0.0:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  reports = {
    /**
     * No description
     *
     * @tags reports
     * @name ReportsList
     * @request GET:/reports/
     * @secure
     */
    reportsList: (
      query?: {
        /** Статус отчета */
        status?: string;
        /**
         * Фильтр по дате снизу
         * @format date
         */
        "start-date"?: string;
        /**
         * Фильтр по дате сверху
         * @format date
         */
        "end-date"?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TemperatureReport[], any>({
        path: `/reports/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsRead
     * @request GET:/reports/{id}/
     * @secure
     */
    reportsRead: (id: string, params: RequestParams = {}) =>
      this.request<GETReportInfo, any>({
        path: `/reports/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsUpdate
     * @request PUT:/reports/{id}/
     * @secure
     */
    reportsUpdate: (id: string, data: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reports/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsConfirmUpdate
     * @request PUT:/reports/{id}/confirm/
     * @secure
     */
    reportsConfirmUpdate: (id: string, data: 0 | 1, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reports/${id}/confirm/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsDeleteDelete
     * @request DELETE:/reports/{id}/delete/
     * @secure
     */
    reportsDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reports/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsFormUpdate
     * @request PUT:/reports/{id}/form/
     * @secure
     */
    reportsFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reports/${id}/form/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  stationsReports = {
    /**
     * No description
     *
     * @tags stations-reports
     * @name StationsReportsPutTemperatureUpdate
     * @request PUT:/stations-reports/{report_id}/{station_id}/put_temperature/
     * @secure
     */
    stationsReportsPutTemperatureUpdate: (
      reportId: string,
      stationId: string,
      data: number,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/stations-reports/${reportId}/${stationId}/put_temperature/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations-reports
     * @name StationsReportsRemoveStationDelete
     * @request DELETE:/stations-reports/{report_id}/{station_id}/remove_station/
     * @secure
     */
    stationsReportsRemoveStationDelete: (reportId: string, stationId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/stations-reports/${reportId}/${stationId}/remove_station/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  stations = {
    /**
     * No description
     *
     * @tags stations
     * @name StationsList
     * @request GET:/stations/
     * @secure
     */
    stationsList: (
      query?: {
        /** Название станции */
        station_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GETStations, any>({
        path: `/stations/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsCreate
     * @request POST:/stations/
     * @secure
     */
    stationsCreate: (data: Station, params: RequestParams = {}) =>
      this.request<Station, any>({
        path: `/stations/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsRead
     * @request GET:/stations/{id}/
     * @secure
     */
    stationsRead: (id: string, params: RequestParams = {}) =>
      this.request<Station, void>({
        path: `/stations/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsUpdate
     * @request PUT:/stations/{id}/
     * @secure
     */
    stationsUpdate: (id: string, data: Station, params: RequestParams = {}) =>
      this.request<Station, any>({
        path: `/stations/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsDelete
     * @request DELETE:/stations/{id}/
     * @secure
     */
    stationsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsAddPicCreate
     * @request POST:/stations/{id}/add-pic/
     * @secure
     */
    stationsAddPicCreate: (id: string, data: File, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${id}/add-pic/`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stations
     * @name StationsAddToReportCreate
     * @request POST:/stations/{id}/add-to-report/
     * @secure
     */
    stationsAddToReportCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/stations/${id}/add-to-report/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersAuthenticationCreate
     * @request POST:/users/authentication/
     * @secure
     */
    usersAuthenticationCreate: (data: User, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/users/authentication/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDeauthorizationCreate
     * @request POST:/users/deauthorization/
     * @secure
     */
    usersDeauthorizationCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/deauthorization/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegistrationCreate
     * @request POST:/users/registration/
     * @secure
     */
    usersRegistrationCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/registration/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
