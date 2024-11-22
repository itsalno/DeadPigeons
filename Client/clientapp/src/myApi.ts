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

export interface BalanceDTO {
  /** @format uuid */
  playerId?: string | null;
  /** @format int32 */
  amount?: number;
  transactionType?: string | null;
  transactionRef?: string | null;
  /** @format date-time */
  timeStamp?: string;
}

export interface Board {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  playerid?: string | null;
  /** @format uuid */
  gameid?: string | null;
  /** @format double */
  price?: number | null;
  isautoplay?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  sequence?: string | null;
  game?: Game;
  player?: PlayerProfile;
}

export interface CreateBalanceDTO {
  /** @format uuid */
  playerId?: string;
  /** @format int32 */
  amount?: number;
  transactionType?: string | null;
  transactionNerf?: string | null;
  /** @format date-time */
  timeStamp?: string;
}

export interface CreateBoardDto {
  /** @format uuid */
  playerid?: string | null;
  /** @format uuid */
  gameid?: string | null;
  /** @format double */
  price?: number | null;
  isautoplay?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  sequence?: string | null;
}

export interface CreateGameDto {
  /** @format int32 */
  week?: number;
  /** @format int32 */
  year?: number | null;
  isactive?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  startingDate?: string;
  /** @format date-time */
  endingDate?: string;
}

export interface Game {
  /** @format uuid */
  id?: string;
  /** @format int32 */
  week?: number;
  winningseq?: string | null;
  /** @format int32 */
  year?: number | null;
  /** @format double */
  prizepool?: number | null;
  /** @format double */
  carryover?: number | null;
  isactive?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  boards?: Board[] | null;
  /** @format date-time */
  startingDate?: string;
  /** @format date-time */
  endingDate?: string;
}

export interface LogIn {
  /** @minLength 1 */
  username: string;
  /**
   * @format password
   * @minLength 1
   */
  password: string;
}

export interface LogInResponseDTO {
  token?: string | null;
  playerProfileId?: string | null;
}

export interface PlayerDTO {
  /** @format uuid */
  playerId?: string;
  /** @format int32 */
  balance?: number | null;
  userName?: string | null;
  email?: string | null;
}

export interface PlayerProfile {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userid?: string | null;
  /** @format int32 */
  balance?: number | null;
  isactive?: boolean | null;
  /** @format int32 */
  createdAt?: number | null;
  boards?: Board[] | null;
  transactions?: Transaction[] | null;
  user?: User;
}

export interface Register {
  /** @minLength 1 */
  username: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @format password
   * @minLength 1
   */
  password: string;
}

export interface Transaction {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  playerid?: string | null;
  /** @format int32 */
  amount?: number;
  transactiontype?: string | null;
  transactionref?: string | null;
  /** @format date-time */
  createdAt?: string;
  player?: PlayerProfile;
}

export interface UpdatePlayerDTO {
  /** @format uuid */
  playerId?: string;
  /** @format int32 */
  balance?: number;
}

export interface User {
  /** @format uuid */
  id?: string;
  username?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  role?: string | null;
  playerProfiles?: PlayerProfile[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthRegisterCreate
     * @request POST:/api/auth/register
     */
    authRegisterCreate: (data: Register, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLoginCreate
     * @request POST:/api/auth/login
     */
    authLoginCreate: (data: LogIn, params: RequestParams = {}) =>
      this.request<LogInResponseDTO, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Balance
     * @name BalanceCreate
     * @request POST:/api/Balance
     */
    balanceCreate: (data: CreateBalanceDTO, params: RequestParams = {}) =>
      this.request<BalanceDTO, any>({
        path: `/api/Balance`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Balance
     * @name BalanceDetail
     * @request GET:/api/Balance/{playerId}
     */
    balanceDetail: (playerId: string, params: RequestParams = {}) =>
      this.request<BalanceDTO, any>({
        path: `/api/Balance/${playerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Board
     * @name BoardCreate
     * @request POST:/api/Board
     */
    boardCreate: (data: CreateBoardDto, params: RequestParams = {}) =>
      this.request<Game, any>({
        path: `/api/Board`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameCreate
     * @request POST:/api/Game
     */
    gameCreate: (data: CreateGameDto, params: RequestParams = {}) =>
      this.request<Game, any>({
        path: `/api/Game`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameActiveGameCreate
     * @request POST:/api/Game/ActiveGame
     */
    gameActiveGameCreate: (params: RequestParams = {}) =>
      this.request<Game, any>({
        path: `/api/Game/ActiveGame`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameGetAllGamesList
     * @request GET:/api/Game/GetAllGames
     */
    gameGetAllGamesList: (params: RequestParams = {}) =>
      this.request<Game[], any>({
        path: `/api/Game/GetAllGames`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameEndGamePartialUpdate
     * @request PATCH:/api/Game/endGame
     */
    gameEndGamePartialUpdate: (
      query?: {
        /** @format uuid */
        id?: string;
        finalSequence?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Game, any>({
        path: `/api/Game/endGame`,
        method: "PATCH",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlayerProfile
     * @name PlayerProfileGetAllPlayersList
     * @request GET:/api/PlayerProfile/GetAllPlayers
     */
    playerProfileGetAllPlayersList: (params: RequestParams = {}) =>
      this.request<PlayerDTO[], any>({
        path: `/api/PlayerProfile/GetAllPlayers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlayerProfile
     * @name PlayerProfileSoftDeletePartialUpdate
     * @request PATCH:/api/PlayerProfile/{id}/softDelete
     */
    playerProfileSoftDeletePartialUpdate: (id: string, params: RequestParams = {}) =>
      this.request<PlayerProfile, any>({
        path: `/api/PlayerProfile/${id}/softDelete`,
        method: "PATCH",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlayerProfile
     * @name PlayerProfileUpdateUpdate
     * @request PUT:/api/PlayerProfile/update/{id}
     */
    playerProfileUpdateUpdate: (id: string, data: UpdatePlayerDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/PlayerProfile/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlayerProfile
     * @name PlayerProfileGetByIdDetail
     * @request GET:/api/PlayerProfile/getById/{id}
     */
    playerProfileGetByIdDetail: (id: string, params: RequestParams = {}) =>
      this.request<PlayerProfile, any>({
        path: `/api/PlayerProfile/getById/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
