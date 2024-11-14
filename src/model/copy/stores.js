// // @flow
// import { combine, merge, sample } from 'effector'
// import { combineEvents } from 'patronum'

// import { persist } from '@@foxford/effector'

// import { Analytics } from 'services/analytics'
// import { UserService } from 'services/user'

// import { screenQueries } from 'molecules/media'

// import {
//   closeLastBanner,
//   clearlyHandler,
//   closeOnboarding,
//   initialize,
//   openOnboarding,
//   returnToCuratorLater,
//   setJoyrideOptions,
//   showFirstBanner,
//   showLastBanner,
//   toAbandonTheCurator,
//   waveToCurator,
//   writeToCurator,
//   changeCourseId,
// } from './events'
// import {
//   IDS_OF_THE_COURSES_WHERE_THE_LAST_ONBOARDING_BANNER_HIDDEN_KEY,
//   ONBOARDING_WITH_A_BOOST_IN_CURATOR_SEEN_KEY,
// } from '../../data/onboarding-with-a-boost-in-curator'
// import { CourseGate } from '../course/gate'
// import { domain } from '../domain'
// import { canDisplayOnboardingWithABoostInCuratorLastBanner } from '../utils'
// import { JOYRIDE_GENERAL_PROPS } from '../../data'

// import type { InitializeProps } from './events'
// import type { Store } from 'effector'
// import type { JoyrideOptions } from 'molecules/explainer/types'

// const $courseId: Store<number> = domain
//   .createStore(0)
//   .on(changeCourseId, (_, courseId) => courseId)
//   .reset(CourseGate.close)

// sample({
//   source: $courseId,
//   clock: initialize,
//   filter: (courseId, { course }) => course.id !== 0 && course.id !== courseId,
//   fn: (_, { course }) => course.id,
//   target: changeCourseId,
// })

// const $isOnboardingSeen: Store<boolean> = domain
//   .store(false)
//   .on([clearlyHandler, returnToCuratorLater, waveToCurator], () => true)

// persist({
//   key: ONBOARDING_WITH_A_BOOST_IN_CURATOR_SEEN_KEY,
//   store: $isOnboardingSeen,
// })

// /** Запрос на инициализацию онборда идет из модели курса с онбордом и попапами */
// sample({
//   source: combine({
//     isOnboardingSeen: $isOnboardingSeen,
//     screenQueries,
//   }),
//   clock: initialize,
//   filter: ({ isOnboardingSeen }) => !isOnboardingSeen,
//   fn: () =>
//     ({ ...JOYRIDE_GENERAL_PROPS, steps: getJoyrideSteps(blocksCount) }),
//   target: setJoyrideOptions,
// })

// const $joyrideOptions: Store<JoyrideOptions | null> = domain
//   .createStore(null)
//   .on(setJoyrideOptions, (_, options) => options)
//   .reset(closeOnboarding, CourseGate.close)

// sample({
//   source: setJoyrideOptions,
//   filter: (joyrideOptions) => joyrideOptions !== null,
//   target: showFirstBanner.prepend(() => undefined),
// })

// const $isFirstBannerShown: Store<boolean> = domain
//   .createStore(false)
//   .on(showFirstBanner, () => true)
//   .reset(openOnboarding, CourseGate.close)

// const $idsOfTheCoursesWhereTheLastOnboardingBannerHidden: Store<number[]> = domain
//   .store([])
//   .on(closeLastBanner, (state, courseId) => [...(state ?? []), courseId])

// persist({
//   key: IDS_OF_THE_COURSES_WHERE_THE_LAST_ONBOARDING_BANNER_HIDDEN_KEY,
//   store: $idsOfTheCoursesWhereTheLastOnboardingBannerHidden,
// })

// sample({
//   source: combine({
//     coursesIds: $idsOfTheCoursesWhereTheLastOnboardingBannerHidden,
//     isOnboardingSeen: $isOnboardingSeen,
//   }),
//   clock: combineEvents<[InitializeProps, number]>({
//     events: [initialize, changeCourseId],
//   }),
//   filter: ({ coursesIds, isOnboardingSeen }, [{ chatProperties, course }]) =>
//     canDisplayOnboardingWithABoostInCuratorLastBanner({ chatProperties, course, coursesIds, isOnboardingSeen }),
//   fn: () => undefined,
//   target: showLastBanner,
// })

// const $isLastBannerShown: Store<boolean> = domain
//   .createStore(false)
//   .on(showLastBanner, () => true)
//   .reset(closeOnboarding, CourseGate.close)

// sample({
//   source: initialize,
//   clock: merge([waveToCurator, writeToCurator, toAbandonTheCurator]),
//   fn: ({ course }) => course.id,
//   target: closeLastBanner,
// })

// sample({
//   source: merge([clearlyHandler, returnToCuratorLater, waveToCurator, closeLastBanner.map(() => undefined)]),
//   target: closeOnboarding,
// })

// /** Analytics */
// $isFirstBannerShown.watch((isShown) => {
//   if (!isShown) return
//   Analytics.modal('show', 'modal', 'onboarding-with-a-boost-in-curator-first-modal')
// })

// $isLastBannerShown.watch((isShown) => {
//   if (!isShown) return
//   Analytics.modal('show', 'modal', 'onboarding-with-a-boost-in-curator-last-modal')
// })

// returnToCuratorLater.watch(() => {
//   Analytics.explainers('click', 'later_btn', 'onboarding-with-a-boost-in-curator')
// })

// waveToCurator.watch(() => {
//   Analytics.explainers('click', 'curator_chat_btn', 'onboarding-with-a-boost-in-curator')
// })

// writeToCurator.watch(() => {
//   Analytics.modal('click', 'curator_chat_btn', 'onboarding-with-a-boost-in-curator-last-modal')
// })

// toAbandonTheCurator.watch(() => {
//   Analytics.modal('click', 'no_curator_btn', 'onboarding-with-a-boost-in-curator-last-modal')
// })

// export {
//   // $isOnboardingRunning as $isOnboardingWithABoostInCuratorRunning,
//   $joyrideOptions as $onboardingWithABoostInCuratorJoyrideOptions,
//   $isFirstBannerShown as $isOnboardingWithABoostInCuratorFirstBannerShown,
//   $isLastBannerShown as $isOnboardingWithABoostInCuratorLastBannerShown,
// }
