import { createClient } from '@supabase/supabase-js';

// Server-side environment variables
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email } = req.body;

    try {
        // Insert user into database
        const { data, error } = await supabase.from('customers').insert([{ name, email }]);

        if (error) throw error;

        res.status(200).json({ message: 'Customer added successfully!', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}
