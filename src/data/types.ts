// ==========================================================================
//  تعريفات الأنواع (Type Definitions) - منصة محاسب برو
// ==========================================================================

/** مستوى الصعوبة للدورة */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional'

/**
 * تصنيف الدورة (محور موضوعي تعليمي).
 * ملاحظة: التصنيفات الخاصة باليمن تعليمية بحتة (تنظيم المحتوى)
 * ولا تتضمن أي ادّعاء قانوني أو ضريبي جديد.
 */
export type CourseCategory =
  | 'general'        // محاسبة عامة
  | 'yemeni'         // محاسبة يمنية
  | 'yemeni-tax'     // ضرائب يمنية
  | 'governmental'   // محاسبة حكومية يمنية
  | 'ifrs'           // معايير IFRS الدولية
  | 'tools'          // أدوات

/** بيانات وصفية لكل تصنيف */
export interface CategoryInfo {
  key: CourseCategory
  label: string
  icon: string
  color: string
  description: string
}

/** نوع المحتوى داخل الدرس */
export interface ContentBlock {
  type:
    | 'heading'      // عنوان فرعي h2
    | 'subheading'   // عنوان فرعي h3
    | 'paragraph'    // فقرة نصية
    | 'list'         // قائمة نقطية
    | 'ordered'      // قائمة مرقمة
    | 'table'        // جدول
    | 'callout'      // صندوق تنبيه/ملاحظة
    | 'journal'      // قيد محاسبي
    | 'formula'      // معادلة محاسبية
    | 'example'      // مثال محلول
  // الحقول حسب النوع
  text?: string
  items?: string[]
  // جدول
  headers?: string[]
  rows?: string[][]
  // صندوق التنبيه
  variant?: 'info' | 'tip' | 'warning' | 'example'
  title?: string
  // قيد محاسبي — يُستخدم الحقل lines في كل الدورات (entries مدعوم للتوافق القديم)
  lines?: JournalLine[]
  entries?: JournalLine[]
  caption?: string
}

/** سطر في القيد المحاسبي */
export interface JournalLine {
  account: string
  debit?: number
  credit?: number
}

/** درس واحد */
export interface Lesson {
  id: string
  slug: string
  title: string
  summary: string
  duration: number          // بالدقائق
  content: ContentBlock[]
  keyPoints?: string[]       // أهم النقاط للمراجعة
  quizId?: string            // معرف اختبار مرتبط
}

/** وحدة تعليمية تضم عدة دروس */
export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

/** دورة كاملة */
export interface Course {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  level: CourseLevel
  icon: string               // أيقونة fontawesome
  color: string              // لون التدرج (gradient)
  duration: string           // مدة تقريبية نصية
  rating: number
  studentsCount: number
  prerequisites: string[]
  objectives: string[]
  modules: Module[]
  tags: string[]
  /** تصنيف موضوعي اختياري (يُحقَن تلقائياً عبر data/index إن لم يُحدَّد) */
  category?: CourseCategory
}

/** سؤال اختبار */
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

/** اختبار */
export interface Quiz {
  id: string
  title: string
  description: string
  courseSlug?: string
  questions: QuizQuestion[]
}

/** مصطلح في القاموس */
export interface GlossaryTerm {
  term: string
  termEn: string
  definition: string
  category: string
}

/** مقال في المدونة */
export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  icon: string
  content: ContentBlock[]
}

/** أداة حاسبية */
export interface ToolInfo {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
}

// دوال مساعدة لأسماء المستويات بالعربية
export const levelNames: Record<CourseLevel, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
  professional: 'احترافي',
}

export const levelColors: Record<CourseLevel, string> = {
  beginner: 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)',
  intermediate: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
  advanced: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
  professional: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
}

// ==========================================================================
//  تصنيفات الدورات (محاور تعليمية)
//  التصنيفات اليمنية هنا تعليمية بحتة لتنظيم المحتوى وتسهيل البحث،
//  ولا تقدّم أي معلومة قانونية أو ضريبية جديدة.
// ==========================================================================

export const categoryList: CategoryInfo[] = [
  {
    key: 'general',
    label: 'محاسبة عامة',
    icon: 'fa-book',
    color: '#1e3a8a',
    description: 'الأساسيات والقوائم المالية والمحاسبة المتقدمة والإدارية لكل محاسب عربي.',
  },
  {
    key: 'yemeni',
    label: 'محاسبة يمنية',
    icon: 'fa-mosque',
    color: '#0d9488',
    description: 'محتوى تعليمي موجّه للمحاسب في الجمهورية اليمنية لتطبيق المفاهيم في بيئته.',
  },
  {
    key: 'yemeni-tax',
    label: 'ضرائب يمنية',
    icon: 'fa-file-invoice-dollar',
    color: '#b45309',
    description: 'مفاهيم الضرائب وضريبة القيمة المضافة من منظور تعليمي للمحاسب اليمني.',
  },
  {
    key: 'governmental',
    label: 'محاسبة حكومية يمنية',
    icon: 'fa-landmark',
    color: '#7c3aed',
    description: 'أساسيات المحاسبة الحكومية والوحدات غير الهادفة للربح بطابع تعليمي.',
  },
  {
    key: 'ifrs',
    label: 'IFRS',
    icon: 'fa-globe',
    color: '#0284c7',
    description: 'معايير المحاسبة والتقارير المالية الدولية وتطبيقها بشكل عملي.',
  },
  {
    key: 'tools',
    label: 'أدوات',
    icon: 'fa-screwdriver-wrench',
    color: '#475569',
    description: 'مهارات وأدوات عملية مثل Excel والمحاسبة الرقمية تخدم العمل اليومي.',
  },
]

export const categoryNames: Record<CourseCategory, string> = categoryList.reduce(
  (acc, c) => {
    acc[c.key] = c.label
    return acc
  },
  {} as Record<CourseCategory, string>
)

/**
 * خريطة تعليمية تربط كل دورة (عبر الـ slug) بتصنيفها الموضوعي.
 * الهدف تنظيم المحتوى والبحث فقط — لا يوجد محتوى قانوني/ضريبي جديد.
 */
export const courseCategoryMap: Record<string, CourseCategory> = {
  // محاسبة عامة
  fundamentals: 'general',
  'financial-statements': 'general',
  'advanced-accounting': 'general',
  'professional-cma': 'general',
  'cost-accounting': 'general',
  'financial-analysis': 'general',
  auditing: 'general',
  'managerial-accounting': 'general',
  'corporate-accounting': 'general',
  // محاسبة يمنية (تطبيق تعليمي في البيئة اليمنية)
  'banking-accounting': 'yemeni',
  // ضرائب يمنية (تعليمي)
  'taxation-vat': 'yemeni-tax',
  // محاسبة حكومية يمنية (تعليمي)
  'governmental-accounting': 'governmental',
  // معايير IFRS
  'ifrs-standards': 'ifrs',
  // أدوات
  'excel-for-accountants': 'tools',
  'digital-accounting': 'tools',
}
