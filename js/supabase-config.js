// Supabase Client & Data Layer for Dr. Ahmed Abdelrahim Dental Surgery
const SUPABASE_URL = 'https://oarlsophixizfahhvqrx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5VArw8zqbHg0pw3icQSuKA_qh_tz-oA';

let supabaseClient = null;

function getSupabaseClient() {
    if (!supabaseClient && window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

// Fetch all cases from Supabase ordered by created_at descending
async function fetchSupabaseCases() {
    const client = getSupabaseClient();
    if (!client) {
        console.warn('Supabase client not initialized, falling back to local data.');
        return null;
    }

    try {
        const { data, error } = await client
            .from('clinical_cases')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching cases from Supabase:', error);
            return null;
        }

        // Map database columns to portfolio object schema
        return (data || []).map(row => {
            let images = [];
            if (row.image) {
                if (typeof row.image === 'string' && row.image.trim().startsWith('[') && row.image.trim().endsWith(']')) {
                    try {
                        const parsed = JSON.parse(row.image);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            images = parsed;
                        }
                    } catch(e) {
                        images = [row.image];
                    }
                } else if (typeof row.image === 'string' && row.image.includes('||')) {
                    images = row.image.split('||').map(s => s.trim()).filter(Boolean);
                } else {
                    images = [row.image];
                }
            }
            if (!images || images.length === 0) {
                images = ['assets/img/cases/default.jpg'];
            }

            return {
                id: row.id,
                title: row.title,
                category: row.category,
                categoryName: row.category_name || row.category,
                badgeColor: row.badge_color || getBadgeColorForCategory(row.category),
                description: row.description,
                tooth: row.tooth || 'Clinical Field',
                diagnosis: row.diagnosis || 'Clinical Diagnosis',
                image: images[0],
                images: images,
                procedureSteps: Array.isArray(row.procedure_steps) ? row.procedure_steps : (typeof row.procedure_steps === 'string' ? JSON.parse(row.procedure_steps) : []),
                highlights: Array.isArray(row.highlights) ? row.highlights : (typeof row.highlights === 'string' ? JSON.parse(row.highlights) : []),
                tags: Array.isArray(row.tags) ? row.tags : (typeof row.tags === 'string' ? JSON.parse(row.tags) : []),
                date: row.date || 'Recent Case',
                author: row.author || 'Dr. Ahmed Abdelrahim',
                created_at: row.created_at
            };
        });
    } catch (err) {
        console.error('Supabase fetch exception:', err);
        return null;
    }
}

// Helper to determine image column string value
function formatCaseImagesForStorage(caseData) {
    if (Array.isArray(caseData.images) && caseData.images.length > 0) {
        return caseData.images.length === 1 ? caseData.images[0] : JSON.stringify(caseData.images);
    }
    return caseData.image || '';
}

// Create new case in Supabase
async function createSupabaseCase(caseData) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase client not available');

    const imagePayload = formatCaseImagesForStorage(caseData);

    const payload = {
        id: caseData.id || 'case-' + Date.now(),
        title: caseData.title,
        category: caseData.category,
        category_name: caseData.categoryName,
        badge_color: caseData.badgeColor || getBadgeColorForCategory(caseData.category),
        description: caseData.description,
        tooth: caseData.tooth,
        diagnosis: caseData.diagnosis,
        image: imagePayload,
        procedure_steps: caseData.procedureSteps || [],
        highlights: caseData.highlights || [],
        tags: caseData.tags || [],
        date: caseData.date,
        author: caseData.author || 'Dr. Ahmed Abdelrahim'
    };

    const { data, error } = await client
        .from('clinical_cases')
        .insert([payload])
        .select();

    if (error) throw error;
    return data;
}

// Update existing case in Supabase
async function updateSupabaseCase(id, caseData) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase client not available');

    const imagePayload = formatCaseImagesForStorage(caseData);

    const payload = {
        title: caseData.title,
        category: caseData.category,
        category_name: caseData.categoryName,
        badge_color: caseData.badgeColor || getBadgeColorForCategory(caseData.category),
        description: caseData.description,
        tooth: caseData.tooth,
        diagnosis: caseData.diagnosis,
        image: imagePayload,
        procedure_steps: caseData.procedureSteps || [],
        highlights: caseData.highlights || [],
        tags: caseData.tags || [],
        date: caseData.date,
        author: caseData.author || 'Dr. Ahmed Abdelrahim'
    };

    const { data, error } = await client
        .from('clinical_cases')
        .update(payload)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data;
}

// Delete case in Supabase
async function deleteSupabaseCase(id) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase client not available');

    const { error } = await client
        .from('clinical_cases')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
}

// Helper to get category badge colors
function getBadgeColorForCategory(category) {
    switch (category) {
        case 'endodontics':
            return 'bg-sky-100 text-sky-800 border-sky-200';
        case 'restorative':
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'surgery':
            return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'prosthodontics':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'whitening':
            return 'bg-teal-100 text-teal-800 border-teal-200';
        case 'pediatric':
            return 'bg-rose-100 text-rose-800 border-rose-200';
        default:
            return 'bg-slate-100 text-slate-800 border-slate-200';
    }
}

// Helper to seed initial 6 cases into Supabase
async function seedDefaultCasesToSupabase() {
    if (typeof clinicalCases === 'undefined' || !Array.isArray(clinicalCases)) {
        throw new Error('Default clinical cases data not found');
    }

    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase client not available');

    const payloads = clinicalCases.map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        category_name: c.categoryName,
        badge_color: c.badgeColor,
        description: c.description,
        tooth: c.tooth,
        diagnosis: c.diagnosis,
        image: c.image,
        procedure_steps: c.procedureSteps || [],
        highlights: c.highlights || [],
        tags: c.tags || [],
        date: c.date,
        author: c.author || 'Dr. Ahmed Abdelrahim'
    }));

    const { data, error } = await client
        .from('clinical_cases')
        .upsert(payloads, { onConflict: 'id' });

    if (error) throw error;
    return data;
}
