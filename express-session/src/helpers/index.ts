/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/10 20:28:39 (GMT+0900)
 */
export function isNumberLike<T>(input: T): boolean {
  if (typeof input === 'string') {
    return /^-?\d+(\.\d+)?$/.test(input)
  }
  return typeof input === 'number'
}

export function formatArgv(argv: string[]): Record<string, any> {
  const result = {};
  argv.forEach((item) => {
    const [key, value] = splitArgv(item);
    result[key] = value;
  });
  return result;
}

function splitArgv(
  input: string
): [string, string | number | boolean | null] {
  if (/^-*([\w-]+)=([\w-]+)$/.test(input)) {
    const key = RegExp.$1;
    let value: string | number | boolean | null | undefined = RegExp.$2;
    if (isNumberLike(value)) {
      value = +value;
    } else if (/^(null|undefined)$/i.test(value)) {
      value = null;
    } else if (/^(true|false)$/i.test(value)) {
      value = /^true$/i.test(value);
    }
    return [key, value];
  }
  return [input, null];
}

export function createResponse<T>(data: T, message = '', code = 0) {
  return {
    code,
    message,
    data,
  };
}

export function isEmailAddress(input: string): boolean {
  if (typeof input !== 'string') return false;
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(input);
}

