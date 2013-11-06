/// <reference path='../_all.ts' />

module buildBoard {

    export interface BranchesFilterScopeImpl {
        filter:Function;
        checkCurrentFilter:Function;
        allBranches:Branch[];
    }

    export class BranchesFilterDirective implements ng.IDirective {

        public restrict = 'E';

        public scope = {
            filter:"&",
            currentFilter:"@",
            allBranches:"@"
        };

        public transclude = true;
        public replace = true;

        public template = '<a class="{{checkCurrentFilter() | activeFilter}}"><span ng-transclude></span></a>';

        public link($scope:BranchesFilterScopeImpl, element:ng.IRootElementService, attributes:any){
            $scope.checkCurrentFilter = function(){

                console.log('check', $scope.filter(), $scope.allBranches);
            }
        }
    }
}