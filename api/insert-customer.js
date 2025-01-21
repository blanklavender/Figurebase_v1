const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email } = req.body;

    const { data, error } = await supabase.from('customers').insert([
        { name, email }
    ]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Customer added successfully!' });
};
