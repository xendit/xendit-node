// eslint-disable-next-line @typescript-eslint/no-explicit-any
function f(fn: (resolve: function, reject: function) => any): Promise<object>;

export = f;
