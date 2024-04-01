const info = (tag, msg) => {
  console.log(`[I][${tag}]:`, msg);
};

const warn = (tag, msg) => {
  console.info(`[W][${tag}]:`, msg);
};

export { info, warn };
