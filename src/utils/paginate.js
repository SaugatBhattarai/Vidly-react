import _ from 'lodash';

export default function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // _.slice(items, startIndex) //slice array from startIndex
    //_.take() // take items from current page
    // _(items) //loadash wrapper object for chaining 

    return _(items).slice(startIndex).take(pageSize).value();
}