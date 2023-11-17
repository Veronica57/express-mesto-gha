const regExpressions = {
  idCheck: /^[0-9a-fA-F]{24}$/,
  urlCheck: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
};

module.exports = regExpressions;
