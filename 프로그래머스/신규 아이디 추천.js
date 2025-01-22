function solution(new_id) {
    // 1 ~ 4
    let return_id = 
        new_id
        .replace(/[A-Z]/g, match => match.toLowerCase())
        .replace(/[^a-z0-9-_.]/g, "")
        .replace(/\.+/g, ".")
        .replace(/^\.+|\.+$/g, '');
    
    // 5
    if (return_id.length === 0) {
        return_id = 'a';
    }
    
    // 6
    if (return_id.length > 15) {
        return_id = return_id.slice(0, 15);
    }
    return_id = return_id.replace(/\.+$/g, '');
    
    // 7
    while (return_id.length < 3) {
        return_id = return_id + return_id[return_id.length - 1];
    }

    return return_id;
}