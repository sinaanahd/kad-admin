function make_time_relatable(time) {
    let temp_time = time;
    temp_time = temp_time.split(":")[0];
    return temp_time;
}
export default make_time_relatable;