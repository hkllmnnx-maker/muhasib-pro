// ==========================================================================
//  تعريفات الأنواع (Type Definitions) - منصة محاسب برو
// ==========================================================================

/** مستوى الصعوبة للدورة */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional'

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
}

/** مستوى صعوبة سؤال الاختبار */
export type QuizDifficulty = 'easy' | 'medium' | 'hard'

/** سؤال اختبار */
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  /** مستوى صعوبة السؤال (اختياري للتوافق مع الأسئلة القديمة) */
  difficulty?: QuizDifficulty
  /** مصدر موثوق للسؤال — إلزامي للأسئلة القانونية/الضريبية */
  source?: string
}

/** أسماء مستويات الصعوبة بالعربية */
export const difficultyNames: Record<QuizDifficulty, string> = {
  easy: 'سهل',
  medium: 'متوسط',
  hard: 'صعب',
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
