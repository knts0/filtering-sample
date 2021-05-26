import * as dayjs from 'dayjs'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export interface Application {
  type: '有給休暇' | '振替休暇'
  appliedAt: dayjs.Dayjs
  applicantId: number
}

export type FilteringCondition = (item: Application) => boolean


export function typeFiltering(filteringCondition: '有給休暇' | '振替休暇'): FilteringCondition {
  return (item: Application) => item.type === filteringCondition
}

export function appliedAtFiltering(filteringCondition: { start: dayjs.Dayjs, end: dayjs.Dayjs }): FilteringCondition {
  return (item: Application) =>
    item.appliedAt.isSameOrAfter(filteringCondition.start)
    && item.appliedAt.isSameOrBefore(filteringCondition.end)
}

export function applicantIdFiltering(filteringCondition: number): FilteringCondition {
  return (item: Application) => item.applicantId === filteringCondition
}

export function andFiltering(filters: FilteringCondition[]): FilteringCondition {
  return (item: Application) =>
    filters.reduce((acc: boolean, cur: FilteringCondition) =>
      acc && cur(item),
      true
    )
}

export function orFilter(filters: FilteringCondition[]): FilteringCondition {
  return (item: Application) =>
    filters.reduce((acc: boolean, cur: FilteringCondition) =>
      acc || cur(item),
      true
    )
}
