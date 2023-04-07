
export function flatten(obj: any, { prefix = '', restrictTo }: any) {
    let restrict = restrictTo;
    if (restrict) {
      restrict = restrict.filter((k: any) => obj.hasOwnProperty(k));
    }
    const result: any = {};
    (function recurse(obj, current, keys) {
      (keys || Object.keys(obj)).forEach((key: any) => {
        const value = obj[key];
        const newKey = current ? current + '.' + key : key; // joined key with dot
        if (value && typeof value === 'object') {
          // @ts-ignore
          recurse(value, newKey); // nested object
        } else {
          result[newKey] = value;
        }
      });
    })(obj, prefix, restrict);
    return result;
  }
  