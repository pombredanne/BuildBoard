/// <reference path='../_all.ts' />
module buildBoard {
    'use strict';

    export class BranchesController {
        public static $inject = [
            '$scope',
            '$http',
            '$window'
        ];

        constructor(private $scope:IBranchesScope, private $http:ng.IHttpService, private $window:IBuildBoardWindow) {
            this.$scope.setFilter = this.setFilter.bind(this);
            this.$scope.checkCurrentFilter = this.checkCurrentFilter.bind(this);

            this.$scope.getUserFilter = (userId:number) => new UserFilter(userId);
            this.$scope.allBranchesFilter = new Filter(branch => true);
            this.$scope.entityBranchesFilter = new Filter(branch => branch.entity != undefined);
            this.$scope.closedBranchesFilter = new Filter(branch => branch.entity != undefined && branch.entity.state.isFinal );

            this.$scope.currentFilter = this.$scope.allBranchesFilter;

            this.$scope.loading = true;

            $http.get($window.jsRoutes.controllers.Application.branches().absoluteURL()).success((data:Branch[]) => {
                this.$scope.allBranches = data;
                this.$scope.users = _.chain(data)
                    .filter(branch=>!!branch.entity)
                    .map(branch=>branch.entity.assignments)
                    .flatten()
                    .unique(false, user=>user.userId)
                    .value();

                this.$scope.loading = false;
            }).error(()=> {
                    this.$scope.loading = false;
                });


        }

        private setFilter(filter:IFilter) {
            this.$scope.currentFilter = filter;
        }

        private checkCurrentFilter(filter:IFilter) {
            return this.$scope.currentFilter.isEquals(filter);
        }
    }


}