import { stringifyVariables } from "@urql/core";

export const cursorPagination = ({
  cursorArgument = "created_at",
  limitArgument = "limit",
  mergeMode = "after",
}) => {
  console.log("pagination");
  // This actually filters out the cache values that are relevant for the
  // current query that we are pulling
  const compareArgs = (fieldArgs, connectionArgs) => {
    for (const key in connectionArgs) {
      if (key === limitArgument) {
        continue;
      } else if (!(key in fieldArgs)) {
        return false;
      }

      // As we are not using offset anymore but a cursorArgument in
      // "where", we need to filter it out to compare which results to stitch together
      const argA = Object.fromEntries(
        Object.entries(fieldArgs[key]).filter(
          ([filterkey]) => !filterkey.includes(cursorArgument)
        )
      );

      const argB = Object.fromEntries(
        Object.entries(connectionArgs[key]).filter(
          ([filterkey]) => !filterkey.includes(cursorArgument)
        )
      );

      if (
        typeof argA !== typeof argB || typeof argA !== "object"
          ? argA !== argB
          : stringifyVariables(argA) !== stringifyVariables(argB)
      ) {
        return false;
      }
    }

    for (const key in fieldArgs) {
      if (key === limitArgument) {
        continue;
      }
      if (!(key in connectionArgs)) return false;
    }

    return true;
  };

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    console.log("fieldName: ", fieldName);

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const existingItemsSet = new Set();
    let result = [];
    let endCursor = null;

    for (let i = 0; i < size; i++) {
      const { fieldKey, arguments: args } = fieldInfos[i];

      if (args === null || !compareArgs(fieldArgs, args)) {
        continue;
      }
      console.log("args: ", args);
      const fetchedItems = cache.resolve(entityKey, fieldKey);
      console.log("fetchedItems: ", fetchedItems);
      console.log("args: ", args[cursorArgument]);
      const currentCursor = args[cursorArgument];

      console.log("currentCursor: ", currentCursor);

      // If the cache is empty (nothing to add to) OR
      // the currentCursor is not a number then STOP
      if (fetchedItems === null || fetchedItems.length === 0) {
        continue;
      }
      const newResult = [];

      for (let j = 0; j < fetchedItems.length; j++) {
        const fetchedItem = fetchedItems;

        // Only add uniquely new fetched items (due to the existingItems Set)
        if (existingItemsSet.has(fetchedItem)) continue;
        newResult.push(fetchedItem);
        existingItemsSet.add(fetchedItem);
      }

      console.log("newResult: ", newResult);
      console.log("existingItemsSet: ", existingItemsSet);

      if (
        (!endCursor || currentCursor < endCursor) ===
        (mergeMode === "after")
      ) {
        result = [...result, ...newResult];
      } else {
        result = [...newResult, ...result];
      }

      console.log("result: ", result);

      endCursor = currentCursor;
    }

    const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    if (hasCurrentPage) {
      return result;
    } else if (!info.store.schema) {
      return undefined;
    } else {
      info.partial = true;
      return result;
    }
  };
};
