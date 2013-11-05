/// <reference path='../_all.ts' />

module buildBoard {

    export interface BranchesFilterParameters{
        name:string;
        filter:string;
    }

    export class BranchesFilterDirective implements ng.IDirective {

        public restrict = 'E';

        public template1 = '<a ng-click="setFilter(allBranchesFilter)" class="{{checkCurrentFilter(allBranchesFilter) | activeFilter}}">All branches'+
'<span class="badge  pull-right">{{allBranchesFilter.getCount(allBranches)}}</span>'+
'</a>';

        public link($scope:IBranchesScope, element:ng.IRootElementService, attributes:BranchesFilterParameters){
        }
    }
}