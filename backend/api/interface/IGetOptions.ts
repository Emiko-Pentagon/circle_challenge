import { FindOptions } from "sequelize";

export interface IGetOptions {
  /**
   * General search query ?q=<anything>
   */
  q?: string;

  /**
   * Field-based search ?fieldName=value
   */
  search?: Record<string, any>;

  /**
   * Allow any extra custom query params
   */
  [key: string]: any;
}

export interface IPaginateOptions extends IGetOptions {
  /**
   * Pagination ?page=1&limit=10
   */
  page?: number;
  limit?: number;

  /**
   * Sort ?sort=createdAt&order=desc
   */
  sort?: string;
  order?: "ASC" | "DESC" | "asc" | "desc";

  /**
   * Pass-through options to Sequelize queries
   */
  findOptions?: FindOptions;
}
