let rawMaterials = [];

let renderRawMaterials = () => {
    let template = ``;
}

$('.raw-material').click(function(){
    selected_item_id = -1;
    $('.item').removeClass('active');
    $(this).addClass('active');
    $('.item-details').empty();
    $('.item-details').parent().find('.widget-header-title').text('Raw materials');
    renderRawMaterials();
})
