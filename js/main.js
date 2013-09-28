function showContent(data) {
    //Remove li existentes

    $('#list-yt li').each(function () {
        $(this).remove();
    });


    var containerModal = $('.video-holder');
    var modal = new YoutubeAPIModal(containerModal);

    for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];

        var title = item.snippet.title.length > 30 ? item.snippet.title.substring(0, 29) + "..." : item.snippet.title;
        var img = item.snippet.thumbnails.medium.url;
        var descricao = item.snippet.description;
        var canal = item.snippet.channelTitle;
        var videoId = item.id.videoId;
       // var videoUrl = "http://www.youtube.com/watch?v=" + videoId;
        var isLastItem = (i + 1) % 3 == 0;

        $('#list-yt').append('<li id="item_' + i + '" class="item-yt' + (isLastItem ? " last-item-yt" : "") + '"></li>');
        var li = $('#item_' + i);

        li.append('<div id="div_' + i + '" class="content-item-yt"><div>');
        li.append('<figure id="figure_' + i + '" class="thumbholder-item-yt"><figure>');

        var div = $('#div_' + i);
        div.append("<h2><a href='#' class='tt-item-yt modal'>" + title + "</a></h2>"); //" + videoUrl + "
        div.append("<span class='data-item-yt'>Canal: " + canal + "</span>");
        div.append("<p class='desc-item-yt'>" + descricao + "</p>");

        var figure = $('#figure_' + i);
        figure.append("<a href='#' class='modal'><img src='" + img + "' alt='" + title + "' class='thumb-item-yt'><div class='bt-mask'></div></a>");

        console.log(videoId);

        figure.find('.modal').click(function () {
            modal.show(videoId);
            
        });

        modal._container.find('.close').click(function () {
            console.log('Fechou!');
            modal.hide();
        });
    }
}


$(document).ready(function () {
    var container = $('.search-holder');
    var app = new YoutubeAPI(container);

    app.getJson(function (dados) {
        showContent(dados);
    });

    /*CSS*/
    $('.ipt-submit').on('click', function (e) {
        $('.main-content').addClass('com-yt-item');
    });

    $('.ipt-search').on('keyup', function (e) {

        var size = $(this).val().length;

        if (size > 3) {
            if (e.keyCode === 13) {
                $('.main-content').addClass('com-yt-item');
                setTimeout(function () {
                    $('.main-tt').addClass('tt-hide');
                }, 600);
            }
        }
    });

    $('.tipo-lista').on('click', function (e) {
        e.preventDefault();
        var nomeClass = $(this).data('classe');
        var listHolder = $('#list-yt');

        $('.item-yt').addClass('fade-ol');

        setTimeout(function () {
            $('.item-yt').removeClass('fade-ol');
            listHolder.removeClass();
            listHolder.addClass(nomeClass);
        }, 600);

    });

    $('.modal').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('body-overflow modal-on');
    });
});