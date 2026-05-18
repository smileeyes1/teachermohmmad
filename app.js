/**
 * Autonomous Educational Intelligence Compiler (AEIC)
 * Production Logic & Real Gemini API Bridge Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // مراجع الـ DOM الأساسية
    const compileBtn = document.getElementById('compileBtn');
    const printBtn = document.getElementById('printBtn');
    const backBtn = document.getElementById('backBtn');
    const toggleKeyVisibility = document.getElementById('toggleKeyVisibility');
    const geminiApiKeyInput = document.getElementById('geminiApiKey');
    
    const appContainer = document.querySelector('.app-container');
    const outputArea = document.getElementById('outputPrintArea');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingStepText = document.getElementById('loadingStepText');
    
    const cardLocalEngine = document.getElementById('cardLocalEngine');
    const cardGeminiEngine = document.getElementById('cardGeminiEngine');
    const geminiStatusText = document.getElementById('geminiStatusText');
    const globalStatusIndicator = document.getElementById('globalStatusIndicator');

    // القواميس المحلية المعرفية المتقدمة لسيناريوهات الفشل أو العمل المحلي المستقر
    const LocalKnowledgeLexicon = {
        verbs: {
            lower: ['يستكشف المفهوم الملموس لـ', 'يلاحظ البنية المرئية لـ', 'يميز بالتجربة الحسية المباشرة', 'يطابق العناصر الممثلة لـ'],
            mid: ['يستنتج القاعدة المعرفية لـ', 'يقارن بين الخصائص المتنوعة لـ', 'يطبق آلية التشغيل المنهجي لـ', 'يصنف مكونات سياق'],
            upper: ['يحلل المكونات الهيكلية التجريدية لـ', 'ينقد النظريات والفرضيات المحيطة بـ', 'يصيغ نموذجاً تفسيرياً متكاملاً لـ', 'يقيم الكفاءة الوظيفية والبيئية لـ']
        },
        phrases: {
            concrete: ['معاينة عينات حقيقية ونماذج مجسمة ملموسة تمثل', 'ملاحظة تفاعلية وعرض حركي بصري يوضح جوهر'],
            semiConcrete: ['رسم تمثيلي ثنائي الأبعاد وتخطيط مفاهيمي صفي لـ', 'صياغة مواقف وسيناريوهات لفظية تترجم أبعاد'],
            abstract: ['الاشتقاق الرمزي الرياضي البحت والصيغ التجريدية لـ', 'صياغة التراكيب الرمزية الجافة والقواعد الصارمة لـ']
        }
    };

    // فلتر تحويل الأرقام الحاسم لضمان الالتزام بالأرقام المشرقية حصرياً (٠١٢٣٤٥٦٧٨٩)
    function enforceEasternArabicNumerals(textData) {
        if (!textData) return 'ـ';
        const westernDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const easternDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        let sanitized = textData.toString();
        for (let i = 0; i < 10; i++) {
            sanitized = sanitized.replace(new RegExp(westernDigits[i], 'g'), easternDigits[i]);
        }
        return sanitized;
    }

    // تتبع حالة مفتاح الـ API وتحديث مؤشرات الواجهة فوراً برؤية إبداعية
    geminiApiKeyInput.addEventListener('input', () => {
        const key = geminiApiKeyInput.value.trim();
        if (key.length > 10) {
            cardGeminiEngine.classList.add('live-api');
            geminiStatusText.innerText = 'جاهز للربط الفوري';
            globalStatusIndicator.innerText = 'اتصال ذكي خارجي';
            globalStatusIndicator.classList.add('active-live');
        } else {
            cardGeminiEngine.classList.remove('live-api');
            geminiStatusText.innerText = 'غير متصل';
            globalStatusIndicator.innerText = 'جاهز للتحليل';
            globalStatusIndicator.classList.remove('active-live');
        }
    });

    toggleKeyVisibility.addEventListener('click', () => {
        if (geminiApiKeyInput.type === 'password') {
            geminiApiKeyInput.type = 'text';
            toggleKeyVisibility.innerText = '🔒';
        } else {
            geminiApiKeyInput.type = 'password';
            toggleKeyVisibility.innerText = '👁️';
        }
    });

    // معالج القرار المحلي المستقر (Dynamic Decision Rule Engine)
    function generateLocalFallbackStructure(subject, gradeStr, topic, gradeInt) {
        const vIdx = Math.floor(Math.random() * 4);
        const sIdx = Math.floor(Math.random() * 2);
        
        let result = {
            contextType: '',
            complexity: '',
            objectives: [],
            induction: '',
            scaffolding: { concrete: '', semiConcrete: '', abstract: '' },
            activities: { group: '', individual: '', practical: '', analytical: '' },
            evaluation: { easy: '', medium: '', hard: '' },
            homework: ''
        };

        if (gradeInt >= 1 && gradeInt <= 3) {
            result.contextType = 'حسي / بصري ملموس / تعلم باللعب النشط';
            result.complexity = `تأسيسي مبسط (مراعاة الخصائص النمائية لطلبة الصف ${gradeStr} الابتدائي)`;
            result.objectives = [
                `أن ${LocalKnowledgeLexicon.verbs.lower[vIdx]} موضوع (${topic}) بأسلوب حسي ملموس داخل الغرفة الصفية.`,
                `أن يشارك في مطابقة المجسمات واللوحات التوضيحية لـ (${topic}) بنسبة إتقان عالية.`,
                `أن يحل تمرين الشطب أو الرسم الدال على المفهوم دون تردد.`
            ];
            result.induction = `عرض صندوق الألعاب الاستكشافي الملموس على الطلاب، وإخراج مجسمات مادية تعبر عن (${topic})، ومطالبتهم بلمسها ووصفها للوصول لعنوان الدرس بشغف وحيوية.`;
            result.scaffolding.concrete = `${LocalKnowledgeLexicon.phrases.concrete[sIdx]} (${topic}) باستخدام أدوات حقيقية ومكعبات ملونة يمسكها الطالب بيده.`;
            result.scaffolding.semiConcrete = `${LocalKnowledgeLexicon.phrases.semiConcrete[sIdx]} (${topic}) من خلال رسومات تعبيرية وبطاقات مصورة للربط والمطابقة على السبورة.`;
            result.scaffolding.abstract = `${LocalKnowledgeLexicon.phrases.abstract[sIdx]} (${topic}) بالانتقال لكتابة اللفظ أو الرمز الرياضي/اللغوي المجرد وقراءته جماعياً.`;
            result.activities.group = `لعبة "بناء النماذج": تتسابق المجموعات الثلاثية لتركيب صور تمثل مكونات وجوهر موضوع (${topic}).`;
            result.activities.individual = `ورقة نشاط تلوين مخصصة لعزل وفصل الرموز التي تعبر عن مبادئ (${topic}).`;
            result.activities.practical = `تشكيل مجسمات بالصلصال أو محاكاة حركية مباشرة لآلية عمل وحركة (${topic}).`;
            result.activities.analytical = `سؤال محرك: "ماذا يحدث لو قمنا بإخفاء هذا الشكل الملموس أمامنا، هل يختفي أثر (${topic})؟"`;
            result.evaluation.easy = `أن يتعرف الطالب على الرسم الصحيح الدال على (${topic}) من بين ثلاثة رسومات مشتتة.`;
            result.evaluation.medium = `أن يذكر الطالب مثالاً واحداً من بيئته الصغيرة يوضح مفهوم (${topic}).`;
            result.evaluation.hard = `أن يربط الطالب بمفرده بين المجسم الحسي لـ (${topic}) ورمزه التجريدي المكتوب بدقة.`;
            result.homework = `رسم (٢) عناصر ملموسة من محيط المنزل تعبر عن مفهوم درس (${topic}) بمساعدة الأهل.`;
        } else if (gradeInt >= 4 && gradeInt <= 6) {
            result.contextType = 'مفاهيمي سياقي / وظيفي تطبيقي للمهارات';
            result.complexity = `متوسط العمق (بناء الفهم المفاهيمي المنظم لطلبة الصف ${gradeStr} الأساسي)`;
            result.objectives = [
                `أن ${LocalKnowledgeLexicon.verbs.mid[vIdx]} سياق ومحددات (${topic}) بناء على القواعد العلمية المشروحة.`,
                `أن يقارن بين الخصائص المتنوعة لـ (${topic}) والعناصر المشابهة لها في الحياة اليومية الحقيقية.`,
                `أن يطبق خوارزمية الحل أو الصياغة لـ (${topic}) في حل مسائل تطبيقية جديدة.`
            ];
            result.induction = `طرح معضلة حياتية واقعية تواجه مجتمع المتعلمين، يتطلب حلها السريع تفكيك وفهم العلاقات الداخلية لموضوع (${topic})، مما يحفز التفكير الوظيفي لديهم.`;
            result.scaffolding.concrete = `${LocalKnowledgeLexicon.phrases.concrete[sIdx]} (${topic}) بالاعتماد على فحص المخططات الهندسية والخرائط الملونة والمجسمات المفككة.`;
            result.scaffolding.semiConcrete = `${LocalKnowledgeLexicon.phrases.semiConcrete[sIdx]} (${topic}) عبر تنظيم المعلومات في جداول مقارنة ثنائية ورسوم بيانية سياقية دالة.`;
            result.scaffolding.abstract = `${LocalKnowledgeLexicon.phrases.abstract[sIdx]} (${topic}) بصياغة القوانين الرياضية الصرفة والتراكيب النظرية المجردة المعتمة.`;
            result.activities.group = `ورشة عمل تعاونية لتحليل أبعاد المعضلة المرتبطة بـ (${topic}) وصياغة تقرير جماعي من نقطتين.`;
            result.activities.individual = `حل مسألة سياقية في الدفتر المدرسي تهدف لعزل المتغيرات التي تحكم خصائص لـ (${topic}).`;
            result.activities.practical = `إجراء تجربة استكشافية مصغرة أو بناء جملة تطبيقية تبرز القيمة العملية لـ (${topic}).`;
            result.activities.analytical = `نقاش مفتوح: "كيف تؤثر الظروف المحيطة بالمسألة على النتائج النهائية المرجوة من (${topic})؟"`;
            result.evaluation.easy = `ملء الفراغات بالقواعد المباشرة المستنتجة من شرح محور (${topic}).`;
            result.evaluation.medium = `تصنيف قائمة من العناصر إلى مجاميع تتبع أو لا تتبع خصائص لـ (${topic}).`;
            result.evaluation.hard = `حل مسألة مركبة تدمج معايير درس (${topic}) مع المعارف السابقة للطالب بكفاءة.`;
            result.homework = `حل الأنشطة والتمارين التطبيقية الواردة في الصفحة رقم (٤) في الكتاب المدرسي المقر لـ (${topic}).`;
        } else {
            result.contextType = 'تحليلي استنتاجي تجريدي عالي الكثافة المعرفية';
            result.complexity = `عميق ومتقدم (تحفيز التفكير النقدي التجريدي الصرف لطلبة الصف ${gradeStr} الأساسي)`;
            result.objectives = [
                `أن ${LocalKnowledgeLexicon.verbs.upper[vIdx]} الهيكل البنائي والمنطقي لـ (${topic}) تفكيكاً نقدياً معززاً بالأدلة البنائية.`,
                `أن يصيغ فرضيات علمية وتراكيب منطقية متكاملة تحكم علاقات ومكونات ظاهرة (${topic}).`,
                `أن يقيم الكفاءة والجدوى العلمية أو اللغوية للبدائل المقترحة ضمن الدرس.`
            ];
            result.induction = `عرض مفارقة فكرية أو جدلية علمية/فلسفية معاصرة تكسر المسلمات التقليدية وتجبر العقل على الاستقصاء التجريدي العميق لـ (${topic}).`;
            result.scaffolding.concrete = `${LocalKnowledgeLexicon.phrases.concrete[sIdx]} (${topic}) باستقراء إحصاءات موثقة وبيانات رقمية ودراسات حالة عالمية معقدة.`;
            result.scaffolding.semiConcrete = `${LocalKnowledgeLexicon.phrases.semiConcrete[sIdx]} (${topic}) من خلال بناء مصفوفات وتدفقات رسومية ونمذجة العمليات المتداخلة ديناميكياً.`;
            result.scaffolding.abstract = `${LocalKnowledgeLexicon.phrases.abstract[sIdx]} (${topic}) بالتعامل التام مع الصياغات الرياضية البحتة والأنظمة الفلسفية أو اللغوية بالغة التجريد والتعقيد وصلاحية البرهنة.`;
            result.activities.group = `حلقة مناظرة فكرية متقدمة بين فريقين للدفاع ونقد النظرية المؤسسة لآليات وضوابط لـ (${topic}).`;
            result.activities.individual = `إعداد ورقة بحثية مصغرة ونقدية مستقلة تبحث في الثغرات التطبيقية المحيطة بسياق لـ (${topic}).`;
            result.activities.practical = `ابتكار خوارزمية منطقية أو كود برمتة محاكاة يمثل السيناريوهات المتوقعة لتغير قيم ومحددات لـ (${topic}).`;
            result.activities.analytical = `تحليل معقد: "استخرج مواطن الخلل المفتعلة في المخطط الهيكلي المعروض لـ (${topic}) وقدم التصحيح المعزز بالبراهين الشاملة."`;
            result.evaluation.easy = `تحديد مدى دقة وصحة الفرضيات المعقدة المستندة للقواعد الكلية لـ (${topic}).`;
            result.evaluation.medium = `استخلاص القيم التجريدية والدلالات المخفية بناء على سياق نصي غير مألوف يطبق شروط (${topic}).`;
            result.evaluation.hard = `تصميم وهندسة نموذج بديل أو معمارية لغوية/رياضية مستحدثة تحل مشكلة بنائية كبرى تتعلق بـ (${topic}).`;
            result.homework = `إعداد دراسة حالة استقصائية متكاملة وموثقة المصادر والمراجع تتناول الامتداد المعرفي المستقبلي لعلوم وفنون لـ (${topic}).`;
        }

        return result;
    }

    // محرك الاتصال الحقيقي الفائق التوليدي (Real Gemini API Integration Client)
    async function callRealGeminiIntelligence(subject, gradeStr, topic, apiKey) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        // بناء البرومبت الإجباري الصارم والذكي لضمان استرجاع JSON نظيف مطابق لمعمارية النظام بالأرقام المشرقية
        const pedagogicalPrompt = `أنت خبير تربوي ومصمم ذكاء تعليمي متقدم وصارم. مهمتك هي إنشاء وثيقة تخطيط وتحضير كاملة مبنية من الصفر كلياً (بدون قوالب ثابتة) تتبع خصائص المنهاج الفلسطيني والتدرج من المحسوس للمجرد لدرس مادة "${subject}"، الموجه لطلبة "${gradeStr}"، وموضوعه الجوهري وعنوانه هو "${topic}".

يجب أن تعيد لي النتيجة حصرياً ككائن JSON نظيف وبدون أي تزيين أو علامات قراءة إضافية (Markdown code blocks) لكي أتمكن من عمل JSON.parse له مباشرة في المتصفح. 
يجب استخدام الأرقام المشرقية (٠، ١، ٢، ٣، ٤، ٥، ٦، ٧، ٨، ٩) حصرياً في جميع القيم والنصوص داخل الـ JSON.

مخطط وبنية الـ JSON المطلوبة بدقة:
{
  "contextType": "سلسلة نصية تشرح طبيعة وسياق المحتوى بدقة وعمق بناء على الصف",
  "complexity": "سلسلة نصية تحدد درجة التعقيد التربوي المتوافقة مع تربة الفهم المتوقعة للطالب",
  "objectives": ["الهدف السلوكي الذكي الأول SMART"، "الهدف السلوكي الثاني SMART"، "الهدف السلوكي الثالث SMART"],
  "induction": "نص التمهيد التفاعلي المرتبط بالحياة اليومية والبيئية الواقعية للطلاب بشكل مشوق وجاذب",
  "scaffolding": {
    "concrete": "شرح خطوة التعلم المحسوس العيني (أدوات، مجسمات ملونة، بيئة مادية محيطة تلمس باليد)",
    "semiConcrete": "شرح خطوة التعلم شبه المحسوس السياقي (رسومات توضيحية للشطب، مواقف لفظية وبطاقات مصورة)",
    "abstract": "شرح خطوة التعلم المجرد الرمزي المعرفي (رموز رياضية جافة، تراكيب لغوية صرفة، اشتقاق مبرهن)"
  },
  "activities": {
    "group": "نشاط تعاوني وجماعي مبتكر ومفصل وغير مكرر يوزع الأدوار على الطلاب",
    "individual": "نشاط فردي استكشافي ذاتي ينمي الاستقلال المعرفي للطالب داخل الحصة",
    "practical": "تطبيق إجرائي وعمّلي مباشر يستهدف صياغة المهارة المكتسبة في منتج أو حل حركي",
    "analytical": "نشاط تفكير وتحليل ونقد يتحدى مهارات التفكير العليا للطلبة"
  },
  "evaluation": {
    "easy": "سؤال أو معيار تقويمي ميسر ومباشر ومحسوس للتحقق من المكتسبات الأولى للمفهوم",
    "medium": "سؤال تقويمي متوسط العمق تطبيقي وسياقي يربط الأفكار ببعضها البعض",
    "hard": "سؤال تقويمي متقدم تجريدي ومركب يقيس القدرة على الابتكار والاستنتاج الذاتي العميق"
  },
  "homework": "واجب منزلي إجرائي معرفي مرتبط مباشرة بالأهداف التعليمية المحققة ومصمم بذكاء تفاعلي"
}`;

        const requestPayload = {
            contents: [{
                parts: [{ text: pedagogicalPrompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
            throw new Error(`فشل استجابة بوابة الذكاء الخارجية. كود الخطأ: ${response.status}`);
        }

        const responseData = await response.json();
        const rawJsonText = responseData.contents[0].parts[0].text;
        
        // تحليل النص وإزالة أي شوائب كود قد تنتج من النموذج تلقائياً كإجراء حماية للصيانة
        let cleanedJsonText = rawJsonText.trim();
        if (cleanedJsonText.startsWith("```json")) {
            cleanedJsonText = cleanedJsonText.substring(7);
        }
        if (cleanedJsonText.endsWith("```")) {
            cleanedJsonText = cleanedJsonText.substring(0, cleanedJsonText.length - 3);
        }
        
        return JSON.parse(cleanedJsonText.trim());
    }

    // المعالج التنفيذي الرئيسي للمجمع البرمجي (AEIC Process Matrix)
    compileBtn.addEventListener('click', async () => {
        const subject = document.getElementById('subjectInput').value.trim();
        const gradeStr = document.getElementById('gradeInput').value;
        const topic = document.getElementById('topicInput').value.trim();
        const apiKey = geminiApiKeyInput.value.trim();

        if (!subject || !topic) {
            alert('❌ ثغرة في طبقة المدخلات: يرجى التحقق من ملء حقول المادة وعنوان الموضوع الدراسي لتشغيل المحرك المجمع.');
            return;
        }

        // تحويل محدد الصف إلى رقمي للاستخدام المعرفي داخل المحرك المحلي
        let gradeInt = 1;
        if (gradeStr === '١') gradeInt = 1;
        else if (gradeStr === '٢') gradeInt = 2;
        else if (gradeStr === '٣') gradeInt = 3;
        else if (gradeStr === '٤') gradeInt = 4;
        else if (gradeStr === '٥') gradeInt = 5;
        else if (gradeStr === '٦') gradeInt = 6;
        else if (gradeStr === '٧') gradeInt = 7;
        else if (gradeStr === '٨') gradeInt = 8;
        else if (gradeStr === '٩') gradeInt = 9;

        // إظهار شاشة التحميل المعمارية المبتكرة
        loadingOverlay.classList.remove('hidden');
        window.scrollTo(0, 0);

        let finalCompiledStructure = null;

        if (apiKey.length > 10) {
            // مسار معالجة الذكاء الحقيقي الخارجي
            loadingStepText.innerText = 'جاري الاتصال ببوابة Gemini-2.5-Flash وتشغيل عقل الإدراك التوليدي الحقيقي...';
            try {
                finalCompiledStructure = await callRealGeminiIntelligence(subject, `الصف ${gradeStr} الأساسي`, topic, apiKey);
                console.log("🟢 تم توليد الوثيقة بنجاح عبر محرك الذكاء الخارجي الحقيقي.");
            } catch (error) {
                console.warn("⚠️ فشل الربط بالذكاء الخارجي، تفعيل المحرك المحلي فورا كخيار تراجع آمن ومستقر:", error);
                loadingStepText.innerText = 'بوابة الاتصال الخارجي تعذرت. تفعيل محرك القواعد الرياضي المحلي تلقائياً لتأمين البيانات...';
                await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة زمنية لإعلام المستخدم هندسياً
                finalCompiledStructure = generateLocalFallbackStructure(subject, gradeStr, topic, gradeInt);
            }
        } else {
            // مسار المعالجة المحلية الفورية
            loadingStepText.innerText = 'تنشيط محرك القواعد الديناميكي المحلي وتفكيك البنية المعرفية بدون استخدام الإنترنت...';
            await new Promise(resolve => setTimeout(resolve, 1200)); // توفير إحساس المعالجة الهندسية
            finalCompiledStructure = generateLocalFallbackStructure(subject, gradeStr, topic, gradeInt);
        }

        // حقن وتنظيم المخرجات داخل طبقة وثيقة الـ A4 مع استخدام معالج تصفية الأرقام المشرقية
        document.getElementById('docSubject').innerText = enforceEasternArabicNumerals(subject);
        document.getElementById('docGrade').innerText = enforceEasternArabicNumerals(`الصف ${gradeStr} الأساسي`);
        document.getElementById('docTopic').innerText = enforceEasternArabicNumerals(topic);
        document.getElementById('docContextType').innerText = enforceEasternArabicNumerals(finalCompiledStructure.contextType);
        document.getElementById('docComplexity').innerText = enforceEasternArabicNumerals(finalCompiledStructure.complexity);

        // توليد معرف عشوائي رقمي للمستند للأرشفة الأكاديمية بالأرقام المشرقية
        const randomId = enforceEasternArabicNumerals(Math.floor(100000 + Math.random() * 900000));
        document.getElementById('docSystemId').innerText = `معرف النظام: AEIC-${randomId}`;

        // صياغة وحقن الأهداف السلوكية
        const objUl = document.getElementById('docObjectives');
        objUl.innerHTML = '';
        finalCompiledStructure.objectives.forEach(obj => {
            let li = document.createElement('li');
            li.innerText = enforceEasternArabicNumerals(obj);
            objUl.appendChild(li);
        });

        document.getElementById('docInduction').innerText = enforceEasternArabicNumerals(finalCompiledStructure.induction);

        // حقن مسار التعليم المتدرج الهرمي البنائي
        const scaffoldDiv = document.getElementById('docScaffolding');
        scaffoldDiv.innerHTML = `
            <div class="scaffold-card-node"><strong>المرحلة الأولى (المحسوس العيني المادي):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.scaffolding.concrete)}</div>
            <div class="scaffold-card-node"><strong>المرحلة الثانية (شبه المحسوس السياقي البصري):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.scaffolding.semiConcrete)}</div>
            <div class="scaffold-card-node"><strong>المرحلة الثالثة (المجرد الرمزي المعرفي):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.scaffolding.abstract)}</div>
        `;

        // حقن مصفوفة الأنشطة المتمايزة
        const actDiv = document.getElementById('docActivities');
        actDiv.innerHTML = `
            <div class="activity-card-node"><strong>👥 نشاط تعاوني وجماعي مشترك:</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.activities.group)}</div>
            <div class="activity-card-node"><strong>👤 نشاط فردي استكشافي ذاتي:</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.activities.individual)}</div>
            <div class="activity-card-node"><strong>🛠️ تطبيق إجرائي وعملي مباشر:</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.activities.practical)}</div>
            <div class="activity-card-node"><strong>🧠 نشاط التفكير والتحليل والنقد:</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.activities.analytical)}</div>
        `;

        // حقن منظومة التقويم متعدد المستويات
        const evalDiv = document.getElementById('docEvaluation');
        evalDiv.innerHTML = `
            <div class="evaluation-card-node"><strong>🟢 مستوى ميسر (مباشر ومحسوس):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.evaluation.easy)}</div>
            <div class="evaluation-card-node"><strong>🟡 مستوى متوسط (تطبيقي وسياقي):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.evaluation.medium)}</div>
            <div class="evaluation-card-node"><strong>🔴 مستوى متقدم (تجريدي ومركب):</strong> ${enforceEasternArabicNumerals(finalCompiledStructure.evaluation.hard)}</div>
        `;

        document.getElementById('docHomework').innerText = enforceEasternArabicNumerals(finalCompiledStructure.homework);

        // إخفاء شاشة التحميل والانتقال الفوري لطبقة المخرجات القابلة للطباعة الرسمية
        loadingOverlay.classList.add('hidden');
        appContainer.classList.add('hidden');
        outputArea.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    // العودة للواجهة وتعديل البيانات
    backBtn.addEventListener('click', () => {
        outputArea.classList.add('hidden');
        appContainer.classList.remove('hidden');
    });

    // استدعاء نظام الطباعة الفيزيائي وعزل عناصر الويب تلقائياً عبر ميديا الـ CSS المقررة
    printBtn.addEventListener('click', () => {
        window.print();
    });
});
