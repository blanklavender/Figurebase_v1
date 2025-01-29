import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../db-config.js';

// For deployment
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        // Store the user data in the database
        const { data, error } = await supabase
            .from('customers')
            .insert([{ name, email }]);

        if (error) throw error;

        // Alert user and reload the page on success
        alert('Thank you for joining our community!');
        location.reload();

        // If storage is successful, proceed to create a Stripe checkout session
        // const response = await fetch('/api/create-checkout-session', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email }),
        // });

        // const { id } = await response.json();

        // if (id) {
        //     const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
        //     await stripe.redirectToCheckout({ sessionId: id });
        // } else {
        //     alert('Failed to initiate payment');
        // }
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing payment or storing data');
    }
});