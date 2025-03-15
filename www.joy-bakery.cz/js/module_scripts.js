// load module function into a page - add class="insert-loader" data-url="**url**"

document.querySelectorAll('.js-insert-loader').forEach(frame => {
    const url = frame.dataset.url;
    const route = url.includes('/insert/') ? url : `/insert${url}`;
    $.post(route, function (result) {
        jQuery(frame).html(result);
    })
})

// insert form submission

const submit_insert_form = (url) => {
    const frame = document.querySelector(`.insert-loader[data-url="${url}"]`);
    let url_array = url.split('/')
    let form_name = url_array[2];

    $.post('/insert' + url, $(`#${form_name}`).serialize(), function(result)
    {
        jQuery(frame).html(result);
        check_success();
    });
}

$(document).off('click', '.submit-insert-form').on('click', '.submit-insert-form', function(e) {
    e.preventDefault();
    submit_insert_form($(this).data('url'));
})

// refresh successful form

const check_success = () => {
    document.querySelectorAll('.form-success').forEach(frame => {
        window.location.reload();
    })
}

// pop up function

const post_url = (url) => {
    url = url.includes('/js/') ? url : `/pop_up${url}`;
    $.post(url, function (result) {
        $("#modalcontent").html(result);
        $("#modal").modal('show');
    })
}

// const post_url = (url) => {
//     url = url.includes('/js/') ? url : `/pop_up${url}`;
//     $.post(url, function (result) {
//         modal_content.html(result);
//         openModal(modal);
//     })
// }

$(document).off('click', '.modal-pop-up').on('click', '.modal-pop-up', function(e){
    e.preventDefault();
    post_url( $(this).data('url'));
});

// close modals

$(document).click(function(e){
    if($(e.target).hasClass('modal')){
        $('#modal').modal('hide');
    }
});

$("button[data-dismiss='modal']").click(function(){
    $('#modal').modal('hide');
});

$(document).off('click', '.modal-close').on('click','.modal-close',function(){
    $('#modal').modal('hide');
});


// pop up form submission

const submit_form = (url) => {
    let url_array = url.split('/')
    let form_name = '';

    if(url.includes('/js/')){
        form_name = url_array[1] + '_' + url_array[3];
    } else {
        url = `/pop_up${url}`;
        form_name = url_array[2];
    }

    $.post(url, $(`#${form_name}`).serialize(), function(result)
    {
        $("#modalcontent").html(result);
    });
}

$(document).off('click', '.submit-pop-up-form').on('click', '.submit-pop-up-form', function(e) {
    e.preventDefault();
    submit_form($(this).data('url'));
})

// original pop up form class listener

$(document).off('click', '.submit-form').on('click', '.submit-form', function(e) {
    e.preventDefault();

    submit_form($(this).data('url'));
});

// $(document).off('click', '.submit-form').on('click', '.submit-form', function(e) {
//     e.preventDefault();
//     const $modals = $(document).find('[data-modal=1]');
//     let $modal_content = '';
//
//     if($modals.length > 1)
//     {
//         $modals.each(function()
//         {
//             if($(this).css('display') !== 'none')
//             {
//                 $modal_content = $(this).find('[data-modal-content=1]');
//             }
//         })
//     }else{
//         $modal_content = $modals.find('[data-modal-content=1]');
//     }
//
//     console.log($(this).data('url'));
//     submit_form($(this).data('url'), $modal_content);
// })


const sageBlock = () => {
    document.querySelector('.sage-block').style.display = 'flex';
}

const sageUnblock = () => {
    document.querySelector('.sage-block').style.display = 'none';
}
