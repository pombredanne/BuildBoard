/// <reference path='../_all.ts' />

module buildBoard {
    export interface IFilter {
        getCount(branches:Branch[]):number
        isEquals(other:IFilter);
    }

    export class Filter implements IFilter {
        constructor(public predicate:(branch:Branch)=>boolean){
        }

        getCount(branches:Branch[]):number{
            return _.filter(branches, this.predicate).length;
        }

        isEquals(other:IFilter){
            return other == this;
        }
    }

    export class UserFilter extends Filter {
        constructor(private userId:number){
            super(branch=>{
                return branch.entity && _.any(branch.entity.assignments, assignemnt=>assignemnt.userId == userId);
            });
        }

        isEquals(other:IFilter){
            return (other instanceof UserFilter) && (<UserFilter>other).userId == this.userId;
        }
    }
}