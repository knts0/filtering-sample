import { Component } from '@angular/core'
import * as dayjs from 'dayjs'

import { andFiltering, applicantIdFiltering, Application, appliedAtFiltering, typeFiltering } from './filters/filter'
import { AndFilter, ApplicantIdFilter, AppliedAtFilter, TypeFilter } from './filters/filter-old'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filtering-sample';

  results: Application[] = [
    { type: '有給休暇', appliedAt: dayjs('2021-05-20 13:00:00'), applicantId: 1 },
    { type: '振替休暇', appliedAt: dayjs('2021-05-25 08:30:00'), applicantId: 2 },
  ]

  filtered = this.results.filter(v =>
    new AndFilter([
      new TypeFilter('振替休暇'),
      new AppliedAtFilter(dayjs('2021-05-25 08:30:00')),
      new ApplicantIdFilter(2),
    ]).isMatch(v)
  )

  filtered2: Application[] = this.results.filter(
    andFiltering([
      typeFiltering('振替休暇'),
      appliedAtFiltering({ start: dayjs('2021-05-24 08:30:00'), end: dayjs('2021-05-26 00:00:00') }),
      applicantIdFiltering(2),
    ])
  )
}
