define(['jquery', 'underscore', 'app/jquery/jquery.navigation'], function ($, _, jn) {
    return {
        start: function (defaults) {
            $('a.navigation').navigation({
                defaults: defaults,
                activeClass: 'active',
                activeElementSelector: function ($a) {
                    return $a.closest('li');
                },
                callback: function (key, value, newValues) {
                    var $roleBranches = $('.role-branch');

                    $roleBranches.addClass('hide-by-user');
                    $roleBranches.addClass('hide-by-entity');

                    if (newValues.branches=='entity'){
                        $('.role-branch[data-entity-id!=""]').removeClass('hide-by-entity');
                    }
                    else if (newValues.branches=='closed'){
                        newValues.user = 'all';
                        $('.role-branch[data-entity-isFinal]').removeClass('hide-by-entity');
                    }
                    else {
                        $roleBranches.removeClass('hide-by-entity');
                    }

                    if (newValues.user == 'all') {
                        $roleBranches.removeClass('hide-by-user');
                    } else {
                        $('.role-branch:has(.role-users[data-user-ids*="|' + value + '|"])').removeClass('hide-by-user');
                    }



                    $('.role-all-branches-count').text($('.role-branch:not(.hide-by-entity)').length);
                }
            });

            $(window).hashchange();

        }
    };
});
/* _.debounce(function (key, newValue, newValues) {





 }, 20)*/