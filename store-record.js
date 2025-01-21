import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY } from './db-config.js';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Store data in session storage temporarily
    sessionStorage.setItem('user_name', name);
    sessionStorage.setItem('user_email', email);

    try {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });

        const { id } = await response.json();

        if (id) {
            const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
            await stripe.redirectToCheckout({ sessionId: id });
        } else {
            alert('Failed to initiate payment');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing payment');
    }
});
