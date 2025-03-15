

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
            })


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

// category menu popup

const post_this_url = (url,modal_content,modal) => {
    // url = url.includes('/js/') ? url : `/pop_up${url}`;

    $.post(url, function (result) {
        modal_content.html(result);
        openModal(modal);
    })
}

$(document).off('click', '[data-target=category]').on('click', '[data-target=category]', function(e){
    e.preventDefault();

    const $selected_header = $(this);

    if(!$selected_header.hasClass('category-active'))
    {
        $('[data-target=category]').each(function(){
            $(this).removeClass('category-active');
        });

        $selected_header.addClass('category-active');

        post_this_url( $selected_header.data('url'), $('[data-modal-content=category-menu-content]'), $('[data-target=category-popup-menu]'));

    }else{
        const $modal = findOpenModal();
        closeModal($modal);

        $('[data-target=category]').each(function(){
            $(this).removeClass('category-active');
        });
    }


});

function findOpenModal()
{
    const $modals = $('[data-modal=1]');
    let $modal = false;

    $modals.each(function(){
        if($(this).css('display') !== 'none')
        {
            $modal = $(this);
        }
    })

    return $modal;
}


const show_payment_window = (url) => {
    $.post(url, function(response){
        $("#payment-content").html(response);
        $("#payment-box").show();
    })
}




// submit form && display response in open modal

const submit_this_form = (url, close_modal) => {
    let url_array = url.split('/')
    let form_name = '';

    if(url.includes('/js/')){
        form_name = url_array[1] + '_' + url_array[3];
    } else {
        url = `/pop_up${url}`;
        form_name = url_array[2];
    }

    const $modal = findOpenModal();

    $.post(url, $(`#${form_name}`).serialize(), function(result)
    {
        const $modal_content = $modal.find('[data-modal-content]');

        if(!close_modal)
        {
            $modal_content.html(result);
        }

    });
}

$(document).off('click', '[data-target=form]').on('click', '[data-target=form]', function(e) {
    e.preventDefault();
    submit_this_form($(this).data('url'));
});


//	slides - carousel / slider
const checkArrows = () => {

    // console.log($('#slider-body').outerWidth(true));
    // console.log($('#slider-content').outerWidth(true));

    if($('#slider-body').outerWidth(true) === $('#slider-content').outerWidth(true))
    {
        $('[data-element=arrow]').each(function(){
            $(this).removeClass('d-none');
        })
    }else{
        $('[data-element=arrow]').each(function(){
            $(this).addClass('d-none');
        })
    }
}

let carousel_stop_click = false;

const carouselRollLeft = (items_class, slider_content,) => {

    const $slider_content = jQuery(slider_content);

    if(carousel_stop_click)
    {
        return;
    }

    carousel_stop_click = true;

    const $firstContainer = $slider_content.find('.'+items_class+':first');
    const $lastContainer = $slider_content.find('.'+items_class+':last');
    const $widthFirst = $firstContainer.outerWidth(true);
    const $margin = ($widthFirst - $firstContainer.outerWidth())/2;

    if($firstContainer.hasClass('movement-right')){
        $firstContainer.removeClass('movement-right');
    }

    const $cloneFirst = $firstContainer.clone(true);
    $cloneFirst.css({
        marginRight: -$widthFirst+$margin,
    });
    $firstContainer.addClass('movement-left');

    $firstContainer.css({
        marginLeft: -$widthFirst+$margin,
    });

    $slider_content.append($cloneFirst);
    setTimeout(()=>{
        $view = slider_content.find('.review-container:nth-child(4)');
        $view.addClass('carousel-shadow-view').removeClass('movement-right');

        $cloneFirst.removeClass('movement-left');
        $cloneFirst.addClass('movement-right');
        $cloneFirst.css({
            marginRight: $margin,
        });
        carousel_stop_click = false;

    },700);

    setTimeout(() =>{
        $firstContainer.remove();
    },700)

}

const carouselRollRight = (items_class, slider_content,) => {

    const $slider_content = jQuery(slider_content);

    if(carousel_stop_click)
    {
        return;
    }

    carousel_stop_click = true;

    const $firstContainer = $slider_content.find('.'+items_class+':first');
    const $lastContainer = $slider_content.find('.'+items_class+':last');
    const $widthLast = $lastContainer.outerWidth(true);
    const $margin = ($widthLast - $lastContainer.outerWidth())/2;

    if($lastContainer.hasClass('movement-left')){
        $lastContainer.removeClass('movement-left');
    }
    const $cloneLast = $lastContainer.clone(true);
    $cloneLast.css({
        marginLeft: -$widthLast+$margin,
    });
    $lastContainer.addClass('movement-right');
    $lastContainer.css({
        marginRight: -$widthLast+$margin,
    })

    $firstContainer.before($cloneLast);

    setTimeout(()=>{
        $view = $slider_content.find('.review-container:nth-child(3)');
        $view.addClass('carousel-shadow-view').removeClass('movement-left');

        $cloneLast.removeClass('movement-right').addClass('movement-left');
        $cloneLast.css({
            marginLeft: $margin,
        });

        carousel_stop_click = false;
    },700);

    setTimeout(() => {
        $lastContainer.remove();
    },700);

}


// CART
// add product to cart
let $click = true;

$(document).off('click','[data-submit=add-to-cart]').on('click','[data-submit=add-to-cart]', function(e){
    e.preventDefault();

    const $btn = $(this);
    // const $product_check = $btn.closest('form').find($('[data-id=module-product]')).val().replace(/ /g,"_");
    // const $product_name = $product_check.replace(/\//g,"--");
    const $product_name = $(this).data('product');
    // const $input_field = $(this).closest($('[data-container=cart-container]')).find($('[data-id=product-weight]')).val();
    const $reload = $(this).data('reload');
    const $show_cart = $(this).data('show-popup');
    const $warning = $(this).closest($('[data-container=cart-container]')).find($('[data-id=warning]'));
    const $url = '/js/cart/add_to_cart/'+$product_name+'/'+$reload;
    const $form = $btn.closest('form');
    const $formData = new FormData($form.get(0));

    if($click)
    {
        $click = false;

        $.ajax({
            method: 'POST',
            url: $url,
            async: false,
            data: $formData,
            processData: false,
            contentType: false,
            success: function(response)
            {
                const $response = jQuery.parseJSON(response);

                if($response['warning'])
                {
                    $warning.fadeIn(500);
                    $click = true;
                }else{

                    $('.cart-product-count').removeClass('d-none');
                    // console.log(response);

                    if($warning.css('display') === 'block')
                    {
                        $warning.fadeOut(500);
                    }

                    if($btn.hasClass('add-to-cart'))
                    {
                        // animateCartBtn($btn);
                        setTimeout(() => {
                            $click = true;
                        }, 1000);

                    }else{

                        // animateCartBtnText($btn);
                        $click = true;
                    }

                    const $cart = $('[data-id=cart]');

                    $cart.each(function(){
                        if($(this).hasClass('d-none'))
                        {
                            $(this).removeClass('d-none');
                        }

                    if($response['reload'])
                    {
                        window.location.reload();
                    }
                    })

                    $('#added-to-cart-btn').fadeIn(500);
                    $('#add-to-cart-btn').toggle();

                    setTimeout(() => {
                        $('#added-to-cart-btn').toggle();
                        $('#add-to-cart-btn').fadeIn(500);
                    },1000);

                    if($show_cart && $show_cart !== '')
                    {
                        post_this_url( $show_cart, $('#dafault-modalcontent'), $('#default-modal'));
                    }


                }


            }
        })
    }


});

// remove from cart

$(document).off('click','[data-submit=m-remove-product]').on('click','[data-submit=m-remove-product]', function(e){
    e.preventDefault();

    const $product_name = $(this).data('product');
    const $reload = $(this).closest('#page-reload').length === 0 ? 0 : 1;
    const $url = '/js/cart/remove_from_cart/'+$product_name+'/'+$reload;

    $.post($url, function(response){

        if($reload === 0)
        {
            const $modal = findOpenModal();
            const $modal_content = $modal.find('[data-modal-content]');
            $modal_content.html(response);


        }else{
            window.location.reload();
        }
    })

});

// navbar

function checkNavbarLinksOpen()
{
    $(document).find('.navbar-links').each(function()
    {
        $(this).css('display', 'none').removeClass('navbar-links__active');
    })
}

$(document).click(function(e){

    if(!$(e.target).hasClass('expand'))
    {
        checkNavbarLinksOpen();
    }
});

// search

let search_timer;
let search_end_interval = 300;

$(document).off('keyup', '#search-product').on('keyup', '#search-product', function() {

    clearTimeout(search_timer);
    search_timer = setTimeout(searchFinished, search_end_interval);

});

const searchFinished = () => {
    // let search = document.querySelector('#search-product').value;
    let search = $('#search-product').val();
    const form = $('#search-product').closest('form');

    const formData = new FormData (form.get(0));

    if(search === ""){
        document.getElementById("search-results").innerHTML = '';

    } else {
        $.ajax({
            type: 'POST',
            url: '/js/search/search/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(result){

                document.getElementById("search-results").innerHTML = result;
            }
        })
    }
}

$(document).off('keyup', '#category-layout-search').on('keyup', '#category-layout-search', function() {

    clearTimeout(search_timer);
    search_timer = setTimeout(categoryPageSearchFinished, search_end_interval);

});

const categoryPageSearchFinished = () => {
    let search = $('#category-layout-search').val();
    const form = $('#category-layout-search').closest('#category-search-form');
    const formData = new FormData (form.get(0));
    if(search === ""){
        document.getElementById("category-layout-search-result").innerHTML = '';

    } else {
        $.ajax({
            type: 'POST',
            url: '/js/search/search/category',
            data: formData,
            processData: false,
            contentType: false,
            success: function(result){

                document.getElementById("category-layout-search-result").innerHTML = result;
            }
        })
    }
}


// chart

$(document).off('click','#selected-timeframe-box').on('click', '#selected-timeframe-box', function(){
    $('#timeframe-selection').toggle();
})

$(document).on('mouseenter','[data-target=graph-info]', function (event) {
    $(this).css('color', '#A08641');
}).on('mouseleave','[data-target=graph-info]',  function(){
    $(this).css('color', '#A7A7A7');
});


$(document).off('click', '[data-target=graph-info]').on('click', '[data-target=graph-info]', function(){

    const $selected_timeframe = $(this);

    if(!$selected_timeframe.hasClass('selected'))
    {
        $('[data-target=graph-info]').each(function(){
            $(this).removeClass('selected').css('display', 'block');
        })

        const $selected_timeframe_clone = $selected_timeframe.clone(true).addClass('selected');

        $('#selected-timeframe').html($selected_timeframe_clone);
        $selected_timeframe.css('display','none');

        $('#timeframe-selection').toggle();

        const $timeframe = $(this).data('days');
        const $url = '/js/modals/graph_metal/'+$timeframe;

        $.post($url, function(response)
        {
            $('#graph-metal').html(response);
        })
    }



})

function metalPriceChart(labels, data){

    // const script = document.createElement('script');
    // script.setAttribute(
    //     'src',
    //     'https://cdn.jsdelivr.net/npm/chart.js',
    // );
    // script.setAttribute('async', '');
    // document.head.appendChild(script);

    const ctx = document.getElementById('myChart');

    const DISPLAY = true;
    const BORDER = false;
    const CHART_AREA = true;
    const TICKS = false;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
    datasets: [{
        label: 'Gold',
        data: data,
    borderWidth: 1,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        drawActiveElementsOnTop: false,
        // backgroundColor: 'red',
}]
},

    options: {
        scales: {
            x: {
                border: {
                    display: BORDER
                },
                grid: {
                    display: DISPLAY,
                        drawOnChartArea: CHART_AREA,
                        drawTicks: TICKS,
                }
            },
            y: {
                beginAtZero: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }
});

}


// CHECKOUT

function checkShippingInfo()
{
    const $address_value = $('#shipping-address').val() !== '';
    const $city_value = $('#shipping-city').val() !== '';
    const $postcode_value = $('#shipping-postcode').val() !== '';



    if( !( $address_value && $city_value && $postcode_value ) )
    {
        if(!$address_value)
        {
            $('#fill-address').removeClass('d-none');
        }

        if(!$city_value)
        {
            $('#fill-city').removeClass('d-none');
        }

        if(!$postcode_value)
        {
            $('#fill-postcode').removeClass('d-none');
        }
        return false;
    }else{
        return true;
    }



}

// MAP
let map;
function showMap()
{
    // Initialize and add the map

    const image = '/images/uploads/image.php?upload=logo.svg';

    async function initMap() {
        // The location of Uluru
        const position = { lat: -25.344, lng: 131.031 };
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerView({
            map: map,
            position: position,
            title: "Uluru",
        });
    }


}

let marker;
async function initMap() {

    const joyLogo = document.createElement('img');

    joyLogo.src = '/images/uploads/image.php?upload=logo.png';

    // The location
    // google
    // const position = { lat: 50.06831982478054, lng: 14.450801897541288 };
    // seznam
    //     const position = { lat: 50.0682611, lng: 14.4508353 };
    const position = { lat: 50.0681611, lng: 14.4508353 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    const map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    const glyphSvgPinView = new google.maps.marker.PinView({
        glyph: joyLogo,
    });

    // The marker, positioned at Uluru
    marker = new AdvancedMarkerView({
        map: map,
        position: position,
        // content: glyphSvgPinView.element,
        content: joyLogo,
        title: "joy-bakery",
    });

}

// navigation

$(document).off('click', '#mobile-burger').on('click','#mobile-burger',function(){
    rollMobileMenu();
})

function rollMobileMenu(){
    const $mobile_menu = $('.mobile-navbar');

    if($mobile_menu.css('display') === 'none')
    {
        $mobile_menu.fadeIn(500);
    }else{
        $mobile_menu.fadeOut(500);
    }

}

$(document).off('click', '.menu-link').on('click', '.menu-link', function(){

    const $id = $(this).data('link');
    sessionStorage.setItem('link', $id);

});

function highlightLink(){
    const $links = $('.menu-link');
    const $clicked = parseInt(sessionStorage.getItem('link'));

    $links.each(function(){
        if($clicked === $(this).data('link'))
        {
            $(this).addClass('underline-link')
        }
    })
}

$(document).off('click', '#nav-logo').on('click', '#nav-logo', function(e){
    sessionStorage.clear();

})

// set language
$(document).off('click','[data-id=language]').on('click','[data-id=language]', function(){

    let $container_width = 0;

    $('[data-id=additional-languages]').toggle();

    // $('[data-id=language]').each(function(){
    //     console.log($(this).outerWidth(true));
    //     if($(this).outerWidth(true) > 0)
    //     {
    //         $container_width = $(this).outerWidth(true);
    //     }
    // })
    //
    // console.log($container_width);
    // $('.additional-languages__container').width($container_width);

});

$(document).off('click','.additional-language').on('click','.additional-language', function(){
    const $lang = $(this).text().trim().toLowerCase();

    $.post('/modals/set_language/'+$lang, function(response){
        window.location.reload();
    });

});






$(document).ready(function(){
    // const navigation = document.querySelector('.navigation__wrapper');
    const navigation = document.querySelector('.navigation__wrapper');
    const sectionOne = document.querySelector(".welcome__container");


    const sectionOneOptions = {
        rootMargin: '-400px 0px 0px 0px',
    };

    const sectionOneObserver = new IntersectionObserver(function(entries,sectionOneObserver ){
        entries.forEach( entry => {
            if(!entry.isIntersecting)
            {
                navigation.classList.add('nav-background');
            }else{
                navigation.classList.remove('nav-background');
            }
        })


    }, sectionOneOptions);

    if(sectionOne)
    {
        sectionOneObserver.observe(sectionOne);
    }else{
        navigation.classList.add('nav-background');
    }

});

function checkSectionHeight()
{
    const $window_height = $(window).outerHeight(true);

    const $footer_height = $('.footer').outerHeight(true);

    let $section_height = 0;

    if($(window).width() > 480)
    {
      $section_height = $window_height - $footer_height;
      console.log($section_height);
      const $div_height = $('.problem-section').outerHeight(true);
      console.log($div_height);

        $div_height <= $section_height ? $('.problem-section').height($section_height) : '';
    }


}









