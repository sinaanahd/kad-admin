function make_full_objects(arr) {
    const obj = {};
    arr.forEach(item => {
        if (item.value) {
            obj[item.title] = item.value;
        }
    });
    return obj;
}
export default make_full_objects;