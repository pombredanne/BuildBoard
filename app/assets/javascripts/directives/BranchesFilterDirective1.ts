/// <reference path='../_all.ts' />

module buildBoard {

    export class BranchesFilterDirective implements ng.IDirective {
        restrict = 'E';
        transclude = true;
        replace = true;

        template = '<a><span ng-transclude></span><span class="badge  pull-right">{{filter().getCount(branches)}}</span></a>';

        scope = {
            filter:"&",
            branches:"=",
            active:"@"
        }
    }
}