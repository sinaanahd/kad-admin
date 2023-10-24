function last_login_check(old_time, new_time) {
    const decrement = Math.abs(old_time - new_time);
    if (old_time === new_time) {
        localStorage.setItem("last-time", JSON.stringify(old_time));
        return false
    }
    else if (decrement > 1 * 5 * 60 * 1000) {
        localStorage.setItem("last-time", JSON.stringify(new_time));
        return true;
    }
    return false;
}
export default last_login_check;