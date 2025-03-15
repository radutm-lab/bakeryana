// modals

function closeModal(el)
{
    if(el.css('display') !== 'none')
    {
        el.css('display', 'none');
    }
}

function openModal(el)
{
    if(el.css('display') === 'none')
    {
        el.css('display', 'block');
    }
}


$(document).off('click', '.default-modal-pop-up').on('click', '.default-modal-pop-up', function(e){
    e.preventDefault();
    post_this_url( $(this).data('url'), $('#dafault-modalcontent'), $('#default-modal'));
});

$(document).click(function(e){

    // $(e.target).attr('id') === 'contentDiv'
    // if($(e.target).hasClass('default-modal'))
    // console.log($(e.target));
    if($(e.target).data('modal') === 1 || $(e.target).hasClass('main-home') || $(e.target).hasClass('main-container') || $(e.target).hasClass('navigation') || $(e.target).hasClass('navbar-bottom'))
    {
        const $modals = $(document).find('[data-modal]');
        let $modal = '';

        $modals.each(function(){
            if($(this).css('display') !== 'none')
            {
                $modal = $(this);
                closeModal($modal);
            }
        });

        scroll_body();


    }
});

// $("button[data-dismiss='this-modal']").click(function(){
//
//     const $modal = findOpenModal();
//     closeModal($modal);
// });

$(document).off('click', '.modal-close').on('click','.modal-close',function(){
    const $modal = findOpenModal();
    closeModal($modal);
});

$(document).off('click', '[data-dismiss=this-modal]').on('click','[data-dismiss=this-modal]',function(){

    const $modal = findOpenModal();
    closeModal($modal);
});


// defaults

const freeze_body = () => {
    $('body').addClass('no-overflow');
}

const scroll_body = () => {
    if($('body').hasClass('no-overflow'))
    {
        $('body').removeClass('no-overflow');
    }
}