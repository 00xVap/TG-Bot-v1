function formatString(str) {
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

module.exports = formatString;