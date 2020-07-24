const API_PATH = 'http://198.11.172.117/sbm-dashboard/';

let log_history = (data) => {
    $.ajax({
        url: API_PATH + 'kitchen/logHistory',
        data: data,
        method: 'post',
        success: (res) => {
            console.log(res)
        }
    })
}
