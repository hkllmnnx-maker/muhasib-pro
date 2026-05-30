import type { Course, Lesson } from './types'
import { courseFundamentals } from './course-fundamentals'
import { courseFinancialStatements } from './course-financial-statements'
import { courseAdvanced } from './course-advanced'
import { courseProfessional } from './course-professional'
import { courseCostAccounting } from './course-cost-accounting'
import { courseFinancialAnalysis } from './course-financial-analysis'
import { courseAuditing } from './course-auditing'
import { courseTaxation } from './course-taxation'
import { courseExcel } from './course-excel'
import { courseGovernmental } from './course-governmental'

// ==========================================================================
//  فهرس البيانات المركزي - جميع الدورات والدوال المساعدة
// ==========================================================================

export const courses: Course[] = [
  courseFundamentals,
  courseFinancialStatements,
  courseAdvanced,
  courseProfessional,
  courseCostAccounting,
  courseFinancialAnalysis,
  courseAuditing,
  courseTaxation,
  courseExcel,
  courseGovernmental,
]

/** إيجاد دورة بالـ slug */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

/** إيجاد درس داخل دورة */
export function findLesson(
  courseSlug: string,
  lessonSlug: string
): { course: Course; lesson: Lesson; moduleIndex: number; lessonIndex: number; flatIndex: number } | undefined {
  const course = getCourseBySlug(courseSlug)
  if (!course) return undefined
  let flatIndex = 0
  for (let mi = 0; mi < course.modules.length; mi++) {
    const mod = course.modules[mi]
    for (let li = 0; li < mod.lessons.length; li++) {
      if (mod.lessons[li].slug === lessonSlug) {
        return { course, lesson: mod.lessons[li], moduleIndex: mi, lessonIndex: li, flatIndex }
      }
      flatIndex++
    }
  }
  return undefined
}

/** الحصول على قائمة مسطّحة بكل دروس الدورة بالترتيب */
export function getFlatLessons(course: Course): { lesson: Lesson; moduleTitle: string }[] {
  const result: { lesson: Lesson; moduleTitle: string }[] = []
  course.modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      result.push({ lesson, moduleTitle: mod.title })
    })
  })
  return result
}

/** عدّ دروس الدورة */
export function countLessons(course: Course): number {
  return course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}

/** الحصول على كل معرّفات الدروس في الدورة */
export function getLessonIds(course: Course): string[] {
  const ids: string[] = []
  course.modules.forEach((m) => m.lessons.forEach((l) => ids.push(l.id)))
  return ids
}

/** الدرس التالي والسابق */
export function getAdjacentLessons(
  course: Course,
  flatIndex: number
): { prev?: Lesson; next?: Lesson } {
  const flat = getFlatLessons(course)
  return {
    prev: flatIndex > 0 ? flat[flatIndex - 1].lesson : undefined,
    next: flatIndex < flat.length - 1 ? flat[flatIndex + 1].lesson : undefined,
  }
}

/** إحصائيات عامة للمنصة */
export function getPlatformStats() {
  const totalLessons = courses.reduce((sum, c) => sum + countLessons(c), 0)
  const totalModules = courses.reduce((sum, c) => sum + c.modules.length, 0)
  const totalStudents = courses.reduce((sum, c) => sum + c.studentsCount, 0)
  return {
    courses: courses.length,
    lessons: totalLessons,
    modules: totalModules,
    students: totalStudents,
  }
}
