/**
 * dbService.js
 * @description: exports all database related methods
 */

import { Op } from "sequelize";
import Models from "../models/index.js";
const OPERATORS = [
  "$and",
  "$or",
  "$like",
  "$in",
  "$eq",
  "$gt",
  "$lt",
  "$gte",
  "$lte",
  "$any",
  "$between",
  "$contains",
];

// create one record
const createOne = async (model, data) => model.create(data);

// create multiple records
const createMany = async (model, data, options = { validate: true }) =>
  model.bulkCreate(data, options);

// update record(s) when query matches
const update = async (model, query, data) => {
  query = queryBuilderParser(query);
  let result = await model.update(data, { where: query, individualHooks: true });
  result = await model.findAll({ where: query });
  return result;
};

// delete record(s) when query matches
const destroy = async (model, query) => {
  query = queryBuilderParser(query);
  const result = await model.findAll({ where: query });
  await model.destroy({ where: query });
  return result;
};

// delete record using primary key
const deleteByPk = async (model, pk) =>
  model.destroy({ where: { [model.primaryKeyField]: pk } });

// find single record
const findOne = async (model, query, options = {}) => {
  try {
    query = queryBuilderParser(query);
    return model.findOne({
      where: query,
      options,
    });
  } catch (error) {
    console.log(error);
  }
};
// find multiple records with pagination
const paginate = async (model, query, options = {}) => {
  try {
    console.log("model", model);
    console.log(query);
    console.log(options);



    query = queryBuilderParser(query);
    if (options && options.select && options.select.length) {
      options.attributes = options.select;
      delete options.select;
    }
    if (options && options.sort) {
      options.order = sortParser(options.sort);
      delete options.sort;
    }
    if (options && options.include && options.include.length) {
      const include = [];
      options.include.forEach((i) => {
        i.model = Models[i.model];
        if (i.query) {
          i.where = queryBuilderParser(i.query);
        }
        include.push(i);
      });
      options.include = include;
    }
    options = {
      ...options,
      where: query,
    };
    console.log(options);

    const result = await model.paginate(options);
    const data = {
      data: result.docs,
      paginator: {
        itemCount: result.total,
        perPage: options.paginate || 25,
        pageCount: result.pages,
        currentPage: options.page || 1,
      },
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

// find multiple records without pagination
const findAll = async (model, query, options = {}) => {
  try {
    query = queryBuilderParser(query);
    if (options && options.select && options.select.length) {
      options.attributes = options.select;
      delete options.select;
    }
    if (options && options.sort) {
      options.order = sortParser(options.sort);
      delete options.sort;
    }
    if (options && options.include && options.include.length) {
      const include = [];
      options.include.forEach((i) => {
        i.model = Models[i.model];
        if (i.query) {
          i.where = queryBuilderParser(i.query);
        }
        include.push(i);
      });
      options.include = include;
    }
    options = {
      where: query,
      ...options,
    };
    return model.findAll(options);
  } catch (error) {
    console.log(error);
  }
};

// count records for specified query
const count = async (model, query, options = {}) => {
  query = queryBuilderParser(query);
  return model.count({
    where: query,
    ...options,
  });
};

//
const upsert = async (model, data, options = {}) => model.upsert(data, options);

/*
 * @description : parser for query builder
 * @param  {obj} data : {}
 * @return {obj} data : query
 */
const queryBuilderParser = (data) => {
  if (data) {
    Object.entries(data).forEach(([key]) => {
      if (typeof data[key] === "object") {
        queryBuilderParser(data[key]);
      }
      if (OPERATORS.includes(key)) {
        const opKey = key.replace("$", "");
        data[Op[opKey]] = data[key];
        delete data[key];
      } else if (key === "$ne") {
        data[Op.not] = data[key];
        delete data[key];
      } else if (key === "$nin") {
        data[Op.notIn] = data[key];
        delete data[key];
      }
    });
  }

  return data;
};

/*
 * @description : parser for query builder of sort
 * @param  {obj} input : {}
 * @return {obj} data : query
 */
const sortParser = (input) => {
  const newSortedObject = [];
  if (input) {
    Object.entries(input).forEach(([key, value]) => {
      if (value === 1) {
        newSortedObject.push([key, "ASC"]);
      } else if (value === -1) {
        newSortedObject.push([key, "DESC"]);
      }
    });
  }
  return newSortedObject;
};

/*
 * @description : find and count multiple records with pagination
 * @param  {obj} data : {}
 * @return {obj} data : query
 */
const findAndCountAll = async (model, query, options = {}) => {
  try {
    query = queryBuilderParser(query);
    if (options && options.select && options.select.length) {
      options.attributes = options.select;
      delete options.select;
    }
    if (options && options.sort) {
      options.order = sortParser(options.sort);
      delete options.sort;
    }
    if (options && options.include && options.include.length) {
      const include = [];
      options.include.forEach((i) => {
        i.model = Models[i.model];
        if (i.query) {
          i.where = queryBuilderParser(i.query);
        }
        include.push(i);
      });
      options.include = include;
    }
    options = {
      where: query,
      ...options,
    };
    const { count, rows } = await model.findAndCountAll(options);
    let data = rows;
    let allResult = {
      data: data,
      paginator: {
        itemCount: count,
        perPage: options.paginate,
        pageCount: Math.ceil(count / options.paginate),
        currentPage: options.page,
      },
    };
    return allResult;
  } catch (error) {
    console.log(error);
  }
};

export default {
  findOne: findOne,
  createOne: createOne,
  createMany: createMany,
  update: update,
  destroy: destroy,
  deleteByPk: deleteByPk,
  findAll: findAll,
  findAndCountAll: findAndCountAll,
  count: count,
  upsert: upsert,
  paginate: paginate,
  queryBuilderParser: queryBuilderParser,
  sortParser: sortParser,
};
