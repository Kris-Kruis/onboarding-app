// // @flow
// import { domain } from '../domain'

// import type { Lesson, Course, UserCourseGoal } from '../../types/common'
// import type { Event } from 'effector'
// import type { ChatProperties } from 'features/curator-chat'
// import type { JoyrideOptions } from 'molecules/explainer/types'

// export type InitializeProps = {|
//   chatProperties: ChatProperties | null,
//   course: Course,
//   lesson: Lesson,
//   userCourseGoal: UserCourseGoal,
// |}

// export const changeCourseId: Event<number> = domain.createEvent('change course id')

// export const initialize: Event<InitializeProps> = domain.createEvent('initialize onboarding with a boost in curator')

// export const setJoyrideOptions: Event<JoyrideOptions | null> = domain.createEvent('set joyride options')

// export const openOnboarding: Event<void> = domain.createEvent('open onboarding')

// export const clearlyHandler: Event<void> = domain.createEvent('clearly handler')

// export const returnToCuratorLater: Event<void> = domain.createEvent('return to  curator later')

// export const waveToCurator: Event<void> = domain.createEvent('wave to curator')

// export const writeToCurator: Event<void> = domain.createEvent('write to curator')

// export const toAbandonTheCurator: Event<void> = domain.createEvent('to abandon the curator')

// export const showFirstBanner: Event<void> = domain.createEvent('show first banner')

// export const showLastBanner: Event<void> = domain.createEvent('show last banner')

// export const closeLastBanner: Event<number> = domain.createEvent('close last banner')

// export const closeOnboarding: Event<void> = domain.createEvent('close onboarding')
