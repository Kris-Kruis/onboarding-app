// // @flow
// import { sample, combine } from 'effector'
// import { combineEvents, delay, once } from 'patronum'

// import { ExplainersService } from 'services/explainers'

// import { $chatProperties, $isFetchedChatProperties } from 'features/curator-chat'

// import { proposeReferralPanel } from 'molecules/referral-slide-panel'

// import { showReferralPanel } from './events'
// import { defaultCourseState, defaultLessonState } from '../../data'
// import { DEFAULT_USER_COURSE_GOAL_DATA, GOAL_SETUP_STEPS } from '../../data/user-course-goal'
// import { getCourseFx, addLessons, getLessonFx, getLessonsFx, leavePage } from '../course/events'
// import { CourseGate } from '../course/gate'
// import { domain } from '../domain'
// import {
//   initialize as initializeOnboardingWithABoostInCurator,
//   closeOnboarding as closeOnboardingWithABoostInCurator,
// } from '../onboarding-with-a-boost-in-curator/events'
// import { getUserCourseGoalFx, startUserCourseGoalSetup } from '../user-goal/events'
// import { isCourseValidForOnboardingWithABoostInCurator, isOnboardingWithABoostInCuratorEnabled } from '../utils'

// import type { CombinedLessons, Course, Lesson, UserCourseGoal, GoalSetupStep } from '../../types/common'
// import type { Store } from 'effector'

// const $lessons: Store<CombinedLessons> = domain
//   .createStore({})
//   .on(addLessons, (rating, result) => result)
//   .reset(leavePage)

// const $course: Store<Course> = domain.createStore(defaultCourseState).on(getCourseFx.done, (course, { result }) => ({
//   ...result,
//   isTeacherCourse: result.isKpk || result.isKpp,
// }))

// const $lesson: Store<Lesson> = domain
//   .createStore(defaultLessonState)
//   .on(getLessonFx.done, (lesson, { result }) => result)
//   .reset(CourseGate.close)

// const $userCourseGoal: Store<UserCourseGoal> = domain
//   .store(DEFAULT_USER_COURSE_GOAL_DATA)
//   .on(getUserCourseGoalFx.doneData, (_, data) => data)
//   .reset(CourseGate.close)

// const $areLessonsFetched: Store<boolean> = domain
//   .createStore(false)
//   .on(getLessonsFx.finally, () => true)
//   .reset(getLessonsFx)

// const $isFetchedCourse: Store<boolean> = domain
//   .createStore(false)
//   .on(getCourseFx.finally, () => true)
//   .reset(getCourseFx)

// const $isFetchedLesson: Store<boolean> = domain
//   .createStore(false)
//   .on(getLessonFx.finally, () => true)
//   .reset(getLessonFx)

// const $isFetchedUserCourseGoal: Store<boolean> = domain.createStore(false).on(getUserCourseGoalFx.finally, () => true)

// const setFirstStep = sample($userCourseGoal, startUserCourseGoalSetup, ({ canEdit, id, needsUpdate }) =>
//   canEdit
//     ? id === undefined
//       ? GOAL_SETUP_STEPS.INTRO_INITIAL
//       : needsUpdate
//         ? GOAL_SETUP_STEPS.INTRO_UPDATING
//         : GOAL_SETUP_STEPS.INTRO_CHANGING
//     : null
// ).filterMap((step) => (step !== null ? step : undefined))

// const $stepsOrder: Store<GoalSetupStep[]> = domain.store([]).on(setFirstStep, (_, firstStep) => [firstStep])

// const $userGoalSetupModalStep: Store<GoalSetupStep | null> = $stepsOrder.map(([step]) => step || null)

// const areRequestsForOnboardingWithABoostInCuratorCompleted = sample({
//   source: combine([$isFetchedCourse, $isFetchedLesson, $isFetchedUserCourseGoal, $isFetchedChatProperties]),
//   filter: (props) => !props.some((value) => value === false),
// })

// /** Инициализируем онборд с бустом в куратора, когда необходимые запросы выполнены и курс валидный */
// sample({
//   source: combine({
//     chatProperties: $chatProperties,
//     course: $course,
//     lesson: $lesson,
//     userCourseGoal: $userCourseGoal,
//   }),
//   clock: areRequestsForOnboardingWithABoostInCuratorCompleted,
//   filter: ({ course, lesson }) => isOnboardingWithABoostInCuratorEnabled(course, lesson) === true,
//   target: initializeOnboardingWithABoostInCurator,
// })

// /** При заходе в курс стартуем выбор цели, если курс без онборда с бустом в куратора */
// sample({
//   source: combine({
//     course: $course,
//     userCourseGoal: $userCourseGoal,
//   }),
//   clock: once(areRequestsForOnboardingWithABoostInCuratorCompleted),
//   filter: ({ course, userCourseGoal }) =>
//     (userCourseGoal.needsSetup || userCourseGoal.needsUpdate) &&
//     isCourseValidForOnboardingWithABoostInCurator(course) === false,
//   target: startUserCourseGoalSetup.prepend(() => undefined),
// })

// /** Показываем реферальный попап сразу, если курс без онборда с бустом в куратора */
// sample({
//   source: combine({
//     areLessonsFetched: $areLessonsFetched,
//     combinedLessons: $lessons,
//     course: $course,
//     explainerStatus: ExplainersService.explainerStatus,
//   }),
//   clock: areRequestsForOnboardingWithABoostInCuratorCompleted,
//   filter: ({ course }) => isCourseValidForOnboardingWithABoostInCurator(course) === false,
//   fn: ({ course, combinedLessons, areLessonsFetched, explainerStatus }) => ({
//     areLessonsFetched,
//     combinedLessons,
//     course,
//     isExplainersServiceRunning: explainerStatus.run,
//   }),
//   target: showReferralPanel,
// })

// /** Показываем реферальный попап, когда загружен список уроков и в текущем уроке не отображен онборд с бустом в куратора */
// sample({
//   source: combine({
//     areLessonsFetched: $areLessonsFetched,
//     combinedLessons: $lessons,
//     course: $course,
//     explainerStatus: ExplainersService.explainerStatus,
//     lesson: $lesson,
//   }),
//   clock: combineEvents<[void, void]>({
//     events: [
//       areRequestsForOnboardingWithABoostInCuratorCompleted.map(() => undefined),
//       $lessons.updates.map(() => undefined),
//     ],
//   }),
//   filter: ({ course, lesson }) => isOnboardingWithABoostInCuratorEnabled(course, lesson) === false,
//   fn: ({ course, combinedLessons, areLessonsFetched, explainerStatus }) => ({
//     areLessonsFetched,
//     combinedLessons,
//     course,
//     isExplainersServiceRunning: explainerStatus.run,
//   }),
//   target: showReferralPanel,
// })

// /** Показываем реферальный попап после закрытия онборда с бустом в куратора */
// sample({
//   source: combine({
//     areLessonsFetched: $areLessonsFetched,
//     combinedLessons: $lessons,
//     course: $course,
//     explainerStatus: ExplainersService.explainerStatus,
//   }),
//   clock: closeOnboardingWithABoostInCurator,
//   fn: ({ course, combinedLessons, areLessonsFetched, explainerStatus }) => ({
//     areLessonsFetched,
//     combinedLessons,
//     course,
//     isExplainersServiceRunning: explainerStatus.run,
//   }),
//   target: showReferralPanel,
// })

// const showReferralPanelDelayed = delay({
//   source: showReferralPanel,
//   timeout: 1000,
// })

// showReferralPanelDelayed.watch(({ combinedLessons, areLessonsFetched, isExplainersServiceRunning, course }) => {
//   if (
//     areLessonsFetched &&
//     (combinedLessons.lessons || []).length > 0 &&
//     !course.isAgentCourse &&
//     !isExplainersServiceRunning
//   ) {
//     proposeReferralPanel(combinedLessons.lessons, {
//       resourceId: course.id,
//       resourceType: 'course',
//     })
//   }
// })

// const areRequestsForExplainerCompleted = sample({
//   source: combine([$isFetchedCourse, $isFetchedLesson, $isFetchedUserCourseGoal, $areLessonsFetched]),
//   filter: (props) => !props.some((value) => value === false),
// })

// /** Показываем базовый (старый) онборд курса, если нет онборда с бустом в куратора */
// const showExplainer = sample({
//   source: combine({
//     course: $course,
//     userGoalSetupModalStep: $userGoalSetupModalStep,
//   }),
//   clock: areRequestsForExplainerCompleted,
//   filter: ({ course, userGoalSetupModalStep }) =>
//     userGoalSetupModalStep === null && isCourseValidForOnboardingWithABoostInCurator(course) == false,
//   fn: () => undefined,
// })

// const $isExplainerShown: Store<boolean> = domain.createStore(false).on(showExplainer, () => true)

// export { $isExplainerShown }
