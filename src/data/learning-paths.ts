// ==========================================================================
//  المسارات التعليمية (Learning Paths) - منصة محاسب برو
//  ملاحظة مهمة: هذا الملف يربط الدورات الموجودة فقط ولا يضيف أي محتوى
//  قانوني أو ضريبي جديد. كل خطوة تشير إلى دورة قائمة بالفعل عبر الـ slug.
// ==========================================================================

import type { Course } from './types'
import { getCourseBySlug, countLessons, getLessonIds } from './index'

/** خطوة واحدة داخل المسار التعليمي */
export interface PathStep {
  courseSlug: string        // معرّف الدورة الموجودة
  label: string             // وصف مختصر لدور هذه الخطوة في المسار
  optional?: boolean        // خطوة اختيارية (تُضاف إن وُجدت الدورة)
}

/** مسار تعليمي مُجمّع من دورات موجودة */
export interface LearningPath {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  steps: PathStep[]
}

// ==========================================================================
//  مسار "المحاسب اليمني"
//  يربط الدورات الموجودة بترتيب منطقي يناسب المحاسب في السياق اليمني.
//  لا يحتوي على معلومات قانونية/ضريبية مُختلقة — يعتمد على محتوى الدورات نفسها.
// ==========================================================================

export const yemeniAccountantPath: LearningPath = {
  id: 'yemeni-accountant',
  slug: 'yemeni-accountant',
  title: 'مسار المحاسب اليمني',
  subtitle: 'رحلة تعليمية متدرّجة تجمع أهم ما يحتاجه المحاسب في السياق اليمني',
  description:
    'مسار مُنظَّم يربط بين دورات المنصة الحالية بترتيب عملي: من أساسيات المحاسبة، ' +
    'مرورًا بإعداد القوائم المالية وفهم الضرائب اليمنية والمحاسبة الحكومية، ' +
    'وصولًا إلى إتقان إكسل للمحاسبين. كل خطوة تبني على ما قبلها لتأهيلك في بيئة العمل المحاسبية اليمنية.',
  icon: 'fa-mosque',
  color: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #fbbf24 100%)',
  steps: [
    {
      courseSlug: 'fundamentals',
      label: 'الأساس الذي يبدأ منه كل محاسب: المعادلة المحاسبية والقيد المزدوج والدورة المحاسبية.',
    },
    {
      courseSlug: 'financial-statements',
      label: 'تعلّم إعداد وقراءة القوائم المالية الأساسية (قائمة الدخل، المركز المالي، التدفقات النقدية).',
    },
    {
      courseSlug: 'taxation-vat',
      label: 'فهم آليات الضرائب في السياق اليمني كما وردت في دورة الضرائب على المنصة.',
    },
    {
      courseSlug: 'governmental-accounting',
      label: 'أساسيات المحاسبة الحكومية اليمنية: الموازنة العامة والرقابة المالية والحسابات الختامية.',
      optional: true,
    },
    {
      courseSlug: 'excel-for-accountants',
      label: 'إتقان أدوات إكسل التي يعتمد عليها المحاسب يوميًا في تنظيم البيانات وإعداد التقارير.',
    },
  ],
}

/** كل المسارات المتاحة */
export const learningPaths: LearningPath[] = [yemeniAccountantPath]

/** إيجاد مسار بالـ slug */
export function getPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((p) => p.slug === slug)
}

/** خطوة محلولة: تتضمن الدورة الكاملة المرتبطة بالخطوة */
export interface ResolvedPathStep extends PathStep {
  course: Course
  lessonsCount: number
  lessonIds: string[]
}

/**
 * حل خطوات المسار إلى دورات حقيقية موجودة فقط.
 * أي خطوة تشير إلى دورة غير موجودة تُحذف تلقائيًا (لا اختلاق).
 */
export function resolvePathSteps(path: LearningPath): ResolvedPathStep[] {
  const resolved: ResolvedPathStep[] = []
  for (const step of path.steps) {
    const course = getCourseBySlug(step.courseSlug)
    if (!course) continue // الدورة غير مضافة بعد — نتجاهلها بأمان
    resolved.push({
      ...step,
      course,
      lessonsCount: countLessons(course),
      lessonIds: getLessonIds(course),
    })
  }
  return resolved
}

/** إجمالي عدد الدروس في المسار (من الدورات الموجودة فقط) */
export function getPathTotalLessons(path: LearningPath): number {
  return resolvePathSteps(path).reduce((sum, s) => sum + s.lessonsCount, 0)
}

/** كل معرّفات الدروس في المسار بالترتيب */
export function getPathLessonIds(path: LearningPath): string[] {
  const ids: string[] = []
  resolvePathSteps(path).forEach((s) => ids.push(...s.lessonIds))
  return ids
}
