import { Request } from "express";

export type RequestWithBody<B> = Request<never, never, B>;
export type RequestWithQuery<Q> = Request<never, never, never, Q>;

export type PaginationRequestType = {
  query: {
    page?: number;
    pageSize?: number;
  };
};
