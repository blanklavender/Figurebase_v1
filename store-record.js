import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './db-config.js';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("entered the insert api");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Insert data into the customers table
    const { data, error } = await supabase.from('customers').insert([
        { name, email }
    ]);

    if (error) {
        alert('Error inserting data: ' + error.message);
    } else {
        alert('Customer added successfully!');
        document.getElementById('payment-form').reset();
    }
});
