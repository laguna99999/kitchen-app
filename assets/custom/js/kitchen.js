let init = () => {
    // Welcome message
    setTimeout(function() {
    	$.gritter.add({
    		title: 'Welcome back, admin!',
    		text: 'Please start cooking.',
    		sticky: true,
    		time: '',
    		class_name: 'my-sticky-class'
    	});
    }, 1000);
    // Timestamp
    setInterval(function(){
        $('.timestamp').text(moment().format('hh:mm:ss A DD, MMM YYYY'));
    }, 1000);
}

let render_item_list = () => {
    // Renders item on sidebar
    let data = [...all_items]; // Need to be changed

    $('.item-list').empty();
    data.map(item => {
        let div = `
            <li class="item" data-item-id="${ item.id }">
                <a href="javascript:;" class="d-flex align-items-center justify-content-start" onclick="select_item('${ item.id }')">
                    <img src="assets/img/items/${ item.picture }.jpg" class="widget-img widget-img-sm rounded"/>
                    <p class="w-50 m-0 m-l-10">${ item.name }</p>
                    <p class="label ${ item.cooked_items.length == 0 ? "bg-red" : "" }">${ item.cooked_items.length }</p>
                </a>
            </li>
        `;
        $('.item-list').append($(div));
    })
    select_item(data[0].id);
}

let select_item = (id) => {
    // Select an item from item list
    $('.item').removeClass('active');
    $(`li[data-item-id=${ id }]`).addClass('active');

    render_item_detail(id);
}

let render_item_detail = (id) => {
    // Renders item detail in the main content
    let item = [...all_items.filter(item => item.id == id)][0];
    
}
$(document).ready(function(){
    init();

    // Render item list
    render_item_list()
})
