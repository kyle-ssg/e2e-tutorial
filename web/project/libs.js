window.React = require('react');
window.ReactDOM = require('react-dom');
window.render = require('react-dom').render;

// eslint-disable-next-line
const PropTypes = require('prop-types');

window.Any = PropTypes.any;
window.OptionalArray = PropTypes.array;
window.OptionalBool = PropTypes.bool;
window.OptionalFunc = PropTypes.func;
window.OptionalNumber = PropTypes.number;
window.OptionalObject = PropTypes.object;
window.OptionalString = PropTypes.string;
window.OptionalNode = PropTypes.node;
window.OptionalElement = PropTypes.element;
window.oneOf = PropTypes.oneOf;
window.oneOfType = PropTypes.oneOfType;
window.RequiredArray = PropTypes.array.isRequired;
window.RequiredBool = PropTypes.bool.isRequired;
window.RequiredFunc = PropTypes.func.isRequired;
window.RequiredNumber = PropTypes.number.isRequired;
window.RequiredObject = PropTypes.object.isRequired;
window.RequiredString = PropTypes.string.isRequired;
window.RequiredNode = PropTypes.node.isRequired;
window.RequiredElement = PropTypes.node.isRequired;

const each = require('lodash/each');
const filter = require('lodash/filter');
const find = require('lodash/find');
const partial = require('lodash/partial');
const findIndex = require('lodash/findIndex');
const range = require('lodash/range');
const map = require('lodash/map');
const cloneDeep = require('lodash/cloneDeep');
const keyBy = require('lodash/keyBy');

window._ = {
    each,
    filter,
    find,
    partial,
    findIndex,
    range,
    map,
    cloneDeep,
    keyBy,
};
