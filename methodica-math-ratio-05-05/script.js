'use strict';

/* לומדה 720 — מתמטיקה יעד 1.5 | יחס | סיין 5
   Shared engine: ../unit-js/ (loaded before this file). */

const TOTAL_SCREENS = 4;

const practiceProgress = {
  questions: [
    { number: 1, visited: false, state: 'not-answered', screen: 1 },
    { number: 2, visited: false, state: 'not-answered', screen: 2 },
    { number: 3, visited: false, state: 'not-answered', screen: 3 }
  ]
};

/* מסך 1 — מסך מעבר, דמות+בועית-דיבור, data-screen="0", id="s0". */
const S0_AVATAR_ASSETS = {
  'character-1': 'assets/videos/boy-avatar-writing-notebook.mp4',
  'character-2': 'assets/videos/yellow-avatar-writing-noebook.mp4'
};
function resetScreenState0() {
  resolveCharBubbleVideo('s0-avatar', S0_AVATAR_ASSETS);
}

/* =========================================================
   מסך 2 — מסך גלילה, שאלה 1 מתוך 3, data-screen="1", id="s1"
   (משולש שווה-שוקיים ABC). חלק א' (VIQ, 3 קלטים) → חלק ב' (SCQ, 3
   אפשרויות). תמונת המשולש קבועה בצד שמאל לכל אורך שני החלקים.
   ========================================================= */
const VIQ_CFG_S1P1_BODY = 'أ. مجموع زوايا المثلث هو <span dir="ltr">°180</span>.<br>المثلث ABC متساوي الساقين. النسبة بين زاوية الرأس ومجموع زاويتَيّ القاعدة هي 3 : 1.<br>يمكننا إيجاد مقدار زاوية الرأس <span dir="ltr"><span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span> · 180 = °45</span><br>لذلك <span dir="ltr"> ∢A = 45°</span>.<br>بما أن الزاويتين المتبقيتين متساويتان، نقسم 135 درجة على 2 ونجد أن مقدار كل واحدة منهما 67.5 درجة‎.';

VIQ_CFG_REGISTER('s1p1', {
  xapi: ['001', 'q1'],
  inputs: ['s1-a', 's1-b', 's1-c'], correct: [45, 67.5, 67.5], checkBtn: 's1-p1-check', feedbox: 's1-p1-feedbox', revealBtn: 's1-p1-reveal-btn', nextScreen: null,
  correctMsg: { title: 'كل الاحترام، أجبتم بشكل صحيح‎!', body: VIQ_CFG_S1P1_BODY },
  wrongOnce: { title: 'غير دقيق.', body: 'حاولوا مرة أخرى.' },
  wrongFinal: { title: 'غير صحيح‎.', body: VIQ_CFG_S1P1_BODY }
});
function s1P1OnInput() { viqOnInput('s1p1'); }
function s1P1Check() { viqCheck('s1p1'); }

const SCQ_CFG_S1P2_BODY = 'ب. نجد مجموع زاويتَيّ القاعدة <span dir="ltr"><span class="frac"><span class="frac-num">3</span><span class="frac-den">4</span></span> · 180 = °135</span><br>بما أنهما متساويتان، فإن مقدار كل زاوية هو <span dir="ltr">135 ÷ 2 = °67.5</span>، لذلك <span dir="ltr"><span dir="ltr">∢B = 67.5°</span></span>.<br>ادّعاء المهندس المعماري الشاب غير صحيح.';
SCQ_CFG_REGISTER('s1p2', {
  xapi: ['001', 'q2'],
  containerSel: '#s1-part-2',
  correctId: 'b',
  checkBtnId: 's1-p2-check',
  feedboxId: 's1-p2-feedbox',
  correctMsg: { title: 'كل الاحترام، أجبتم بشكل صحيح‎!', body: SCQ_CFG_S1P2_BODY },
  wrongOnce: { title: 'غير دقيق.', body: 'حاولوا مرة أخرى.' },
  wrongFinal: { title: 'غير صحيح‎.', body: SCQ_CFG_S1P2_BODY },
  onDone: function () {
    practiceProgress.questions[0].state = scqState.s1p2.outcome === 'success' ? 'correct' : 'incorrect';
    document.getElementById('s1-continue').disabled = false;
    syncPracticeProgressNav(document.getElementById('s1'));
  }
});
function s1P2Select(id) { scqSelect('s1p2', id); }
function s1P2Check() { scqCheck('s1p2'); }

function s1P2HintOpen() { document.getElementById('s1-p2-hint-overlay').hidden = false; xapiRequestedHint('001', 'q2'); }
function s1P2HintClose() { document.getElementById('s1-p2-hint-overlay').hidden = true; }

const S1_GESTURE = makeScrollGestureHint('s1-scroll-gesture', 's1-scroll-area');

function s1P1AlignCheckBtn() {
  alignBtnToLeftmost(document.getElementById('s1-p1-check'),
    document.querySelectorAll('#s1-part-1 .viq-coord'), document.getElementById('s1-part-1'));
}

function resetScreenState1() {
  setCurrentQuestion(practiceProgress, 0);
  syncPracticeProgressNav(document.getElementById('s1'));
  S1_GESTURE.maybeShow();
  requestAnimationFrame(equalizeScqOptWidths);
  requestAnimationFrame(s1P1AlignCheckBtn);
}

/* =========================================================
   מסך 3 — מסך סטטי (לא גלילה), שאלה 2 מתוך 3, data-screen="2",
   id="s2". דיאגרמת ACD/ADB עם שני קלטים הממוקמים כ-overlay אבסולוטי
   מתחת לדיאגרמה. אין רמז.
   ========================================================= */
const VIQ_CFG_S2_BODY = 'النسبة بين مساحة المثلث‎ ACD ‎ومساحة المثلث‎ ABD ‎هي <br>3 : 1. <br> مساحة‎ ABC ‎هي <span dir="ltr">ABC = <span dir="rtl">64 سم مربع</span></span>.<br>نحسب مساحتَيّ المثلثين:<br>مساحة ACD هي <span dir="ltr"><span class="frac"><span class="frac-num">3</span><span class="frac-den">4</span></span> · 64 = 48</span><br>ومساحة هي <span dir="ltr"><span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span> · 64 = 16</span>.<br>AE يساوي 8 سم، وهو ارتفاع في المثلث ACD، لذلك:<br><span dir="ltr"><span class="frac"><span class="frac-num">8·CD</span><span class="frac-den">2</span></span> = 48</span>، <span dir="ltr">4CD = 48</span>، <span dir="ltr">لذلك CD = <span dir="rtl">12 سم</span></span>.<br>للمثلثان (ACD و-ABD) يوجد نفس الارتفاع.<br>النسبة بين الأضلاع التي تتقاطع مع الارتفاع ستكون مساوية للنسبة بين المساحتين (3 : 1).<br>لذلك – <span dir="ltr">BD = 12 : 3 = 4</span>.';
VIQ_CFG_REGISTER('s2', {
  xapi: ['002', 'q1'],
  inputs: ['s2-cd', 's2-db'], correct: [12, 4], checkBtn: 's2-continue', feedbox: 's2-feedbox', revealBtn: 's2-reveal-btn', nextScreen: 3,
  correctMsg: { title: 'كل الاحترام، أجبتم بشكل صحيح‎!', body: VIQ_CFG_S2_BODY },
  wrongOnce: { title: 'غير دقيق.', body: 'حاولوا مرة أخرى.' },
  wrongFinal: { title: 'غير صحيح‎.', body: VIQ_CFG_S2_BODY },
  onDone: function () {
    practiceProgress.questions[1].state = viqState.s2.outcome === 'success' ? 'correct' : 'incorrect';
    document.getElementById('s2-continue').disabled = false;
    syncPracticeProgressNav(document.getElementById('s2'));
  }
});
function s2OnInput() { viqOnInput('s2'); }
function s2Check() { viqCheck('s2'); }

function resetScreenState2() {
  setCurrentQuestion(practiceProgress, 1);
  syncPracticeProgressNav(document.getElementById('s2'));
}

/* =========================================================
   מסך 4 — מסך גלילה, שאלה 3 מתוך 3, data-screen="3", id="s3". שאלת
   ערבוב-צבעים (יחס 2:3:5). חלק א' (VIQ, 3 קלטים) → חלק ב' (SCQ, 4
   אפשרויות). זהו המסך האחרון בסיין.
   ========================================================= */
const VIQ_CFG_S3P1_BODY = 'أ. نرمز بـ<span dir="ltr">x</span> إلى إجمالي لترات طلاء "الأخضر الزيتوني" الناتج. مجموع أجزاء النسبة هو: 5 + 3 + 2 = 10. لذلك يشكل اللون الأسود 2/10 من الخليط. نرمز بـ<span dir="ltr">x</span> إلى كمية لترات الخليط ونبني معادلة: <span dir="ltr"><span class="frac"><span class="frac-num">2</span><span class="frac-den">10</span></span> · x = 12</span><br>نقسم على <span class="frac"><span class="frac-num">2</span><span class="frac-den">10</span></span> ونحصل على: <span dir="ltr">x = 60</span>.<br>لذلك، يوجد 60 لترًا من الدهان الأخضر الزيتوني.<br>يشكل اللون الأصفر <span class="frac"><span class="frac-num">5</span><span class="frac-den">10</span></span> من الخليط. وهذا نصف الخليط، لذلك يوجد 30 لترًا من الدهان الأصفر في الخليط.<br>الاستنتاج: يوجد <span dir="ltr">60 − 12 − 30 = <span dir="rtl">18 لترًا</span></span><br>من الدهان الأزرق في الخليط.';

VIQ_CFG_REGISTER('s3p1', {
  xapi: ['003', 'q1'],
  inputs: ['s3-total', 's3-yellow', 's3-blue'], correct: [60, 30, 18], checkBtn: 's3-p1-check', feedbox: 's3-p1-feedbox', revealBtn: 's3-p1-reveal-btn', nextScreen: null,
  correctMsg: { title: 'كل الاحترام، أجبتم بشكل صحيح‎!', body: VIQ_CFG_S3P1_BODY },
  wrongOnce: { title: 'غير دقيق.', body: 'حاولوا مرة أخرى.' },
  wrongFinal: { title: 'غير صحيح‎.', body: VIQ_CFG_S3P1_BODY }
});
function s3P1OnInput() { viqOnInput('s3p1'); }
function s3P1Check() { viqCheck('s3p1'); }

function s3P1HintOpen() { document.getElementById('s3-p1-hint-overlay').hidden = false; xapiRequestedHint('003', 'q1'); }
function s3P1HintClose() { document.getElementById('s3-p1-hint-overlay').hidden = true; }

const SCQ_CFG_S3P2_BODY = 'ب. الإجابة ب صحيحة لأن جزء اللون الأسود فقط ازداد.';
SCQ_CFG_REGISTER('s3p2', {
  xapi: ['003', 'q2'],
  containerSel: '#s3-part-2',
  correctId: 'b',
  checkBtnId: 's3-p2-check',
  feedboxId: 's3-p2-feedbox',
  correctMsg: { title: 'كل الاحترام، أجبتم بشكل صحيح‎!', body: SCQ_CFG_S3P2_BODY },
  wrongOnce: { title: 'غير دقيق.', body: 'حاولوا مرة أخرى.' },
  wrongFinal: { title: 'غير صحيح‎.', body: SCQ_CFG_S3P2_BODY },
  onDone: function () {
    practiceProgress.questions[2].state = scqState.s3p2.outcome === 'success' ? 'correct' : 'incorrect';
    document.getElementById('s3-continue').disabled = false;
    syncPracticeProgressNav(document.getElementById('s3'));
  }
});
function s3P2Select(id) { scqSelect('s3p2', id); }
function s3P2Check() { scqCheck('s3p2'); }

const S3_GESTURE = makeScrollGestureHint('s3-scroll-gesture', 's3-scroll-area');

function s3AlignHintRow() {
  alignBtnToLeftmost(document.querySelector('#s3-part-1 .btn-hint-row'),
    document.querySelectorAll('#s3-part-1 .viq-input'), document.getElementById('s3-part-1'));
}

function resetScreenState3() {
  setCurrentQuestion(practiceProgress, 2);
  syncPracticeProgressNav(document.getElementById('s3'));
  S3_GESTURE.maybeShow();
  requestAnimationFrame(s3AlignHintRow);
}

scqFbMakeDraggable('s2-feedbox');

/* ═══════════════ xAPI — this component's reporting seam ═══════════════
   Ids come from ../metadata/methodica-math-ratio-05-05.json (checked on every load by 50-loader.js).
   SCREEN_TO_SUBCONTENT: screen → [item suffix, page-in-item]; exactly TOTAL_SCREENS keys. */
var XAPI_COMP_SLUG = 'methodica-math-ratio-05-05';
var XAPI_COMP_ID   = XAPI_ID_PREFIX + XAPI_COMP_SLUG + '/';
var XAPI_METADATA_FILE = '../metadata/methodica-math-ratio-05-05.json';
var SCREEN_TO_SUBCONTENT = { 0: ['001', 1], 1: ['001', 2], 2: ['002', 1], 3: ['003', 1] };
var XAPI_EVAL_ITEMS = { '001': 1, '002': 1, '003': 1 };   /* items with code-graded questions */
