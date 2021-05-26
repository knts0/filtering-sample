import * as dayjs from 'dayjs'

import { Application } from './filter'

/**
 * 絞り込み条件を満たすか検査する機能を表す
 */
 export interface Filter {
  /**
   * 条件を満たしているか判定
   *
   * @param obj 対象のオブジェクト
   */
  isMatch(item: Application): boolean
}


export class TypeFilter implements Filter {
  constructor(private filteringCondition: '有給休暇' | '振替休暇') {}
  isMatch(item: Application): boolean {
    return item.type === this.filteringCondition
  }
}

export class AppliedAtFilter implements Filter {
  constructor(private filteringCondition: dayjs.Dayjs) {}
  isMatch(item: Application): boolean {
    return item.appliedAt.isSame(this.filteringCondition)
  }
}

export class ApplicantIdFilter implements Filter {
  constructor(private filteringCondition: number) {}
  isMatch(item: Application): boolean {
    return item.applicantId === this.filteringCondition
  }
}

export class AndFilter implements Filter {
  constructor(private filters: Filter[]) {}
  isMatch(item: Application): boolean {
    return this.filters.reduce((acc: boolean, cur: Filter) =>
      acc && cur.isMatch(item), true
    )
  }
}

export class OrFilter implements Filter {
  constructor(private filters: Filter[]) {}
  isMatch(item: Application): boolean {
    return this.filters.reduce((acc: boolean, cur: Filter) =>
      acc || cur.isMatch(item), true
    )
  }
}
