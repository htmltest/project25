(function($) {

    $(document).ready(function() {

        // управление отображением
        $('.top-img-visible-checkbox input').change(function() {
            if ($('.top-img-visible').hasClass('checked')) {
                $('body').removeClass('no-image');
            } else {
                $('body').addClass('no-image');
            }
        });

        $('.top-img-visible input:checked').parent().parent().addClass('checked');
        $('.top-img-visible').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.top-font-size-1').click(function(e) {
            $('body').removeClass('font-max');
            $('body').addClass('font-mini');
            $('.top-font-size-2, .top-font-size-3').removeClass('active');
            $('.top-font-size-1').addClass('active');
            e.preventDefault();
        });

        $('.top-font-size-2').click(function(e) {
            $('body').removeClass('font-max');
            $('body').removeClass('font-mini');
            $('.top-font-size-1, .top-font-size-3').removeClass('active');
            $('.top-font-size-2').addClass('active');
            e.preventDefault();
        });

        $('.top-font-size-3').click(function(e) {
            $('body').addClass('font-max');
            $('body').removeClass('font-mini');
            $('.top-font-size-1, .top-font-size-2').removeClass('active');
            $('.top-font-size-3').addClass('active');
            e.preventDefault();
        });

        $('.top-scheme-1').click(function(e) {
            $('.top-scheme-2, .top-scheme-3').removeClass('active');
            $('.top-scheme-1').addClass('active');
            e.preventDefault();
        });

        $('.top-scheme-2').click(function(e) {
            $('.top-scheme-1, .top-scheme-3').removeClass('active');
            $('.top-scheme-2').addClass('active');
            e.preventDefault();
        });

        $('.top-scheme-3').click(function(e) {
            $('.top-scheme-1, .top-scheme-2').removeClass('active');
            $('.top-scheme-3').addClass('active');
            e.preventDefault();
        });

        // формы
        if ($('form').length > 0) {
            $.Placeholder.init({color : '#393939'});

            $.extend($.validator.messages, {
                required: '— Не введен текст сообщения',
                email: '— Введен некорректный e-mail'
            });

            $('.form-checkbox span input:checked').parent().addClass('checked');
            $('.form-checkbox').click(function() {
                $(this).find('span').toggleClass('checked');
                $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
            });

            $('.form-radio span input:checked').parent().addClass('checked');
            $('.form-radio').click(function() {
                var curName = $(this).find('input').attr('name');
                $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
                $(this).find('span').addClass('checked');
                $(this).find('input').prop('checked', true).trigger('change');
            });

            $('.form-select select').chosen({disable_search: true});

            $('.fileupload').fileupload({
                url: 'js/jquery.fileupload/server/php/',
                acceptFileTypes: /(\.|\/)(xls|xlsx|doc|docx|pdf)$/i,
                autoUpload: true
            });

            $('form').each(function() {
                $(this).validate({
                    ignore: [],
                    rules: {
                        city: {required: true},
                        district: {required: true}
                    },
                    messages: {
                        city: {required: '— Не выбрана опция'},
                        district: {required: '— Не выбрана опция'}
                    }
                });
            });
        }

        // галерея в подвале
        $('.bottom-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length / 4);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.bottom-slider-ctrl').html(newHTML);
                $('.bottom-slider-ctrl a:first').addClass('active');
            }

            curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
        });

        $('.bottom').on('click', '.bottom-slider-ctrl a', function(e) {
            var curSlider = $('.bottom-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.bottom-slider-ctrl a').index($(this));

                $('.bottom-slider-ctrl a.active').removeClass('active');
                $('.bottom-slider-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -(curIndex * 4) * curSlider.find('li:first').width()}, function() {
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        // новости на главной
        $('.main-news-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length / 4);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.main-news-ctrl').html(newHTML);
                $('.main-news-ctrl a:first').addClass('active');
            }

            curSlider.find('ul').width(curSlider.find('li:first').width() * 4);
        });

        $('.main-news').on('click', '.main-news-ctrl a', function(e) {
            var curSlider = $('.main-news-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.main-news-ctrl a').index($(this));

                $('.main-news-ctrl a.active').removeClass('active');
                $('.main-news-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').fadeOut(function() {
                    curSlider.find('li').hide();
                    curSlider.find('li').eq(curIndex * 4).show();
                    curSlider.find('li').eq(curIndex * 4 + 1).show();
                    curSlider.find('li').eq(curIndex * 4 + 2).show();
                    curSlider.find('li').eq(curIndex * 4 + 3).show();
                    curSlider.find('ul').fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        // слайдер экскурсий на главной
        $('.main-item-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            if (curSlider.find('li').length < 2) {
                curSlider.find('.slider-next, .slider-prev').hide();
            }
        });

        $('.main-item-slider-next').click(function(e) {
            var curSlider = $('.main-item-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex++;
                if (curIndex == curSlider.find('li').length) {
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(function() {
                    curSlider.find('li').eq(curIndex).fadeIn(function() {
                        curSlider.data('curIndex', curIndex);
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        $('.main-item-slider-prev').click(function(e) {
            var curSlider = $('.main-item-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex--;
                if (curIndex == -1) {
                    curIndex = curSlider.find('li').length - 1;
                }

                curSlider.find('li:visible').fadeOut(function() {
                    curSlider.find('li').eq(curIndex).fadeIn(function() {
                        curSlider.data('curIndex', curIndex);
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        // слайдер на главной
        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.slider-ctrl').html(newHTML);
                $('.slider-ctrl a:first').addClass('active');
            }
        });

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.slider-ctrl a').index($(this));

                $('.slider-ctrl a').removeClass('active');
                $(this).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul li:visible').fadeOut(function() {
                    curSlider.find('ul li').eq(curIndex).fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        // обратная связь
        $('.subheader-feedback-link a, .footer-feedback-link a').click(function(e) {
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                windowOpen(html);

                $.Placeholder.init({color : '#393939'});

                $.extend($.validator.messages, {
                    required: 'Не введен текст сообщения —',
                    email: 'Введен некорректный e-mail —'
                });

                $('.window .form-select select').chosen({disable_search: true});

                $('.window form').validate({
                    ignore: [],
                    rules: {
                        messageto: {required: true}
                    },
                    messages: {
                        messageto: {required: 'Не выбрана опция —'}
                    },
                    submitHandler: function(form) {
                        $('.window .loading').show();
                        $.ajax({
                            url: $(form).attr('action'),
                            dataType: 'html',
                            cache: false
                        }).done(function(html) {
                            windowClose();
                            windowOpen(html);
                        });
                    }
                });
            });

            e.preventDefault();
        });

        // подгрузка новостей
        $('.content').on('click', '.news-more a', function(e) {
            $('.news').data('textLink', $('.news-more a').html());
            $('.news-more').html('ЗАГРУЗКА...');
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.news').append(html);
                if ($('.news .news-more').length > 0) {
                    $('.news-more').html('<a href="' + $('.news .news-more a').attr('href') + '">' + $('.news').data('textLink') + '</a>');
                    $('.news .news-more').remove();
                } else {
                    $('.news-more').remove();
                }
            });

            e.preventDefault();
        });

        // слайдер в мероприятиях
        $('.events-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.events-slider-item-ctrl').html(newHTML);
                $('.events-slider-item-ctrl').each(function() {
                    var curIndex = $('.events-slider-item-ctrl').index($(this));
                    $(this).find('a').eq(curIndex).addClass('active');
                });
            }

            curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
        });

        $('.events-slider').on('click', '.events-slider-item-ctrl a', function(e) {
            var curSlider = $('.events-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $(this).parents().filter('.events-slider-item-ctrl').find('a').index($(this));

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        // экскурсии
        function resizeTours() {
            $('.tours').each(function() {
                var curBlock = $(this);
                curBlock.find('.tour-anonce, .tour-wrap').css({'min-height': 0});
                curBlock.find('.tour:nth-child(4n)').each(function() {
                    var curItem   = $(this);
                    var curIndex  = curBlock.find('.tour').index(curItem);
                    var prevItem  = curBlock.find('.tour').eq(curIndex - 1);
                    var firstItem = curBlock.find('.tour').eq(curIndex - 2);
                    var zeroItem  = curBlock.find('.tour').eq(curIndex - 3);

                    var curHeight = curItem.find('.tour-anonce').height();

                    if (prevItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = prevItem.find('.tour-anonce').height();
                    }

                    if (firstItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = firstItem.find('.tour-anonce').height();
                    }

                    if (zeroItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = zeroItem.find('.tour-anonce').height();
                    }

                    curItem.find('.tour-anonce').css({'min-height': curHeight});
                    prevItem.find('.tour-anonce').css({'min-height': curHeight});
                    firstItem.find('.tour-anonce').css({'min-height': curHeight});
                    zeroItem.find('.tour-anonce').css({'min-height': curHeight});

                    var curHeight = curItem.find('.tour-wrap').height();

                    if (prevItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = prevItem.find('.tour-wrap').height();
                    }

                    if (firstItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = firstItem.find('.tour-wrap').height();
                    }

                    if (zeroItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = zeroItem.find('.tour-wrap').height();
                    }

                    curItem.find('.tour-wrap').css({'min-height': curHeight});
                    prevItem.find('.tour-wrap').css({'min-height': curHeight});
                    firstItem.find('.tour-wrap').css({'min-height': curHeight});
                    zeroItem.find('.tour-wrap').css({'min-height': curHeight});
                });

                if (curBlock.find('.tour').length % 4 == 3) {
                    var curItem   = curBlock.find('.tour:last');
                    var curIndex  = curBlock.find('.tour').index(curItem);
                    var prevItem  = curBlock.find('.tour').eq(curIndex - 1);
                    var firstItem = curBlock.find('.tour').eq(curIndex - 2);

                    var curHeight = curItem.find('.tour-anonce').height();

                    if (prevItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = prevItem.find('.tour-anonce').height();
                    }

                    if (firstItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = firstItem.find('.tour-anonce').height();
                    }

                    curItem.find('.tour-anonce').css({'min-height': curHeight});
                    prevItem.find('.tour-anonce').css({'min-height': curHeight});
                    firstItem.find('.tour-anonce').css({'min-height': curHeight});

                    var curHeight = curItem.find('.tour-wrap').height();

                    if (prevItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = prevItem.find('.tour-wrap').height();
                    }

                    if (firstItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = firstItem.find('.tour-wrap').height();
                    }

                    curItem.find('.tour-wrap').css({'min-height': curHeight});
                    prevItem.find('.tour-wrap').css({'min-height': curHeight});
                    firstItem.find('.tour-wrap').css({'min-height': curHeight});
                }

                if (curBlock.find('.tour').length % 4 == 2) {
                    var curItem   = curBlock.find('.tour:last');
                    var curIndex  = curBlock.find('.tour').index(curItem);
                    var prevItem  = curBlock.find('.tour').eq(curIndex - 1);

                    var curHeight = curItem.find('.tour-anonce').height();

                    if (prevItem.find('.tour-anonce').height() > curHeight) {
                        curHeight = prevItem.find('.tour-anonce').height();
                    }

                    curItem.find('.tour-anonce').css({'min-height': curHeight});
                    prevItem.find('.tour-anonce').css({'min-height': curHeight});

                    var curHeight = curItem.find('.tour-wrap').height();

                    if (prevItem.find('.tour-wrap').height() > curHeight) {
                        curHeight = prevItem.find('.tour-wrap').height();
                    }

                    curItem.find('.tour-wrap').css({'min-height': curHeight});
                    prevItem.find('.tour-wrap').css({'min-height': curHeight});
                }
            });
        }

        $('.content').on('click', '.tours-more a', function(e) {
            $('.tours').data('textLink', $('.tours-more a').html());
            $('.tours-more').html('ЗАГРУЗКА...');
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.tours-list').append(html);
                if ($(window).width() > 320) {
                    resizeTours();
                }
                if ($('.tours .tours-more').length > 0) {
                    $('.tours-more').html('<a href="' + $('.tours .tours-more a').attr('href') + '">' + $('.tours').data('textLink') + '</a>');
                    $('.tours .tours-more').remove();
                } else {
                    $('.tours-more').remove();
                }
            });

            e.preventDefault();
        });

        // галереи
        $(window).bind('load resize', function() {
            if ($(window).width() > 320) {
                resizeTours();
            } else {
                $('.tour-anonce, .tour-wrap').css({'min-height': 0});
            }
        });

        $('.gallery-item-photo a').click(function(e) {
            if ($(window).width() > 320) {
                var windowWidth     = $(window).width();
                var windowHeight    = $(window).height();
                var curScrollTop    = $(window).scrollTop();

                $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
                $(window).scrollTop(0);
                $('.wrapper').css({'top': -curScrollTop});
                $('.wrapper').data('scrollTop', curScrollTop);

                var curIndex = $('.gallery-item-photo a').index($(this));
                $('.item-gallery-list ul li a').eq(curIndex).click();

                $('.item-gallery').addClass('item-gallery-open');
            }

            e.preventDefault();
        });

        $('.item-gallery-close').click(function(e) {
            itemGalleryClose();
            e.preventDefault();
        });

        $('body').keyup(function(e) {
            if (e.keyCode == 27) {
                itemGalleryClose();
            }
        });

        function itemGalleryClose() {
            if ($('.item-gallery-open').length > 0) {
                $('.wrapper').css({'top': 'auto', 'left': 'auto'});
                $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'visible'});
                $(window).scrollTop($('.wrapper').data('scrollTop'));

                $('.item-gallery').removeClass('item-gallery-open');
            }
        }

        $(window).bind('load resize', function() {
            var contentHeight   = $(window).height() - ($('.item-gallery-text').height() + $('.item-gallery-list').height());
            $('.item-gallery-big').css({'height': contentHeight, 'line-height': contentHeight + 'px'});
            $('.item-gallery-big img').css({'max-height': contentHeight});
        });

        $('.item-gallery-list ul li a').click(function(e) {
            var curLink = $(this);
            var curLi   = curLink.parent();

            $('.item-gallery-title span').html(curLink.attr('title'));
            var contentHeight   = $(window).height() - ($('.item-gallery-text').height() + $('.item-gallery-list').height());
            $('.item-gallery-big').css({'height': contentHeight, 'line-height': contentHeight + 'px'});
            $('.item-gallery-big img').css({'max-height': contentHeight});

            var curIndex = $('.item-gallery-list ul li').index(curLi);
            $('.item-gallery-big img').attr('src', curLink.attr('href'));
            $('.item-gallery-big img').load(function() {
                $('.item-gallery-big strong').height($('.item-gallery-big img').height());
            });
            $('.item-gallery-list ul li.active').removeClass('active');
            curLi.addClass('active');

            e.preventDefault();
        });

        $('.item-gallery-prev').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.item-gallery-list ul li').length - 1;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();

            e.preventDefault();
        });

        $('.item-gallery-next').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex++;
            if (curIndex >= $('.item-gallery-list ul li').length) {
                curIndex = 0;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();

            e.preventDefault();
        });

        $('.item-gallery-list').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
            if (curSlider.find('li').length < 12) {
                curSlider.find('.item-gallery-list-next').css({'display': 'none'});
            }

            curSlider.find('ul').width(78 * curSlider.find('li').length);
        });

        $('.item-gallery-list-next').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 10;
                curSlider.find('.item-gallery-list-prev').css({'display': 'block'});
                if (curIndex >= curSlider.find('li').length - 12) {
                    curIndex = curSlider.find('li').length - 12;
                    curSlider.find('.item-gallery-list-next').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 78}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.item-gallery-list-prev').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 10;
                curSlider.find('.item-gallery-list-next').css({'display': 'block'});
                if (curIndex <= 0) {
                    curIndex = 0;
                    curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 78}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('nav, .side-menu').click(function() {
            if ($(window).width() < 321) {
                $(this).toggleClass('open');
            }
        });

    });

    $(window).bind('load resize scroll', function() {
        if ($(window).width() < 321) {
            $('header').removeClass('header-fixed');
            $('.top').css({'margin-bottom': 0});
        } else {
            if ($(window).scrollTop() > ($('.top').height() + 14)) {
                $('header').addClass('header-fixed');
                $('.top').css({'margin-bottom': $('header').height()});
            } else {
                $('header').removeClass('header-fixed');
                $('.top').css({'margin-bottom': 0});
            }
        }
    });

    // открытие окна
    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();

        $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'margin-left': 20, 'left': 'auto'});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-container').css({'margin-top': 20, 'top': 'auto'});
            $('.window-overlay').height($('.window-container').height() + 40);
        } else {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        }

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);
    }

    // обработка Esc после открытия окна
    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    // закрытие окна
    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto', 'left': 'auto'});
        $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'visible'});
        $(window).scrollTop($('.wrapper').data('scrollTop'));
    }

})(jQuery);