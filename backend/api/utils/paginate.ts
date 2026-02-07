import { IPaginateOptions } from "../interface/IGetOptions";
import { FindAndCountOptions, Model } from "sequelize";

export async function paginate<T extends Model>(
  model: any,
  options: IPaginateOptions
) {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const offset = (page - 1) * limit;

  let findOptions: FindAndCountOptions = {
    limit,
    offset,
    ...options.findOptions,
  };

  // Add sorting
  if (options.sort) {
    findOptions.order = [[options.sort, options.order || "ASC"]];
  }

  // Add search
  if (options.search) {
    findOptions.where = { ...options.search };
  }

  const { rows, count } = await model.findAndCountAll(findOptions);

  return {
    data: rows,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
}
