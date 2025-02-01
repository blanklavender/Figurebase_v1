document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        try {
            // Call API to insert user details into Supabase
            const insertResponse = await fetch('/api/insert-customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const insertResult = await insertResponse.json();

            if (!insertResponse.ok) {
                throw new Error(insertResult.error);
            }

            alert('Thank you for joining us!');

            // // Save user info temporarily in sessionStorage before redirecting to Stripe
            // sessionStorage.setItem('user_name', name);
            // sessionStorage.setItem('user_email', email);

            // console.log('stored in session storage');

            // // Call API to create Stripe checkout session
            // const checkoutResponse = await fetch('/api/create-checkout-session', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email }),
            // });

            // if (!checkoutResponse.ok) {
            //     const errorData = await checkoutResponse.json();
            //     throw new Error(errorData.error || "Failed to create checkout session");
            // }

            // const { id } = await checkoutResponse.json();
            // console.log('Session ID from backend:', id);

            // if (id) {
            //     const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');  // Replace
            //     await stripe.redirectToCheckout({ sessionId: id });
            // } else {
            //     alert('Failed to initiate payment');
            // }

        } catch (error) {
            console.error('Error:', error);
            alert('Error processing payment or storing data');
        } finally {
            // Reset form and refresh page
            document.getElementById('payment-form').reset();
            location.reload();
        }
    });

    document.getElementById('kit-payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('kit-name').value;
        const email = document.getElementById('kit-email').value;

        try {
            // Call API to insert user details into Supabase
            const insertResponse = await fetch('/api/insert-kit-customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const insertResult = await insertResponse.json();

            if (!insertResponse.ok) {
                throw new Error(insertResult.error);
            }

            alert('Thank you for joining us! You will be redirected to a payment page now.');

            // Redirect the user
            window.location.href = 'https://buy.stripe.com/14kbM33Tz0aa5dm000';

            // // Save user info temporarily in sessionStorage before redirecting to Stripe
            // sessionStorage.setItem('user_name', name);
            // sessionStorage.setItem('user_email', email);

            // // Call API to create Stripe checkout session
            // const checkoutResponse = await fetch('/api/create-checkout-session', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email }),
            // });

            // const { id } = await checkoutResponse.json();

            // if (id) {
            //     const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace 
            //     await stripe.redirectToCheckout({ sessionId: id });
            // } else {
            //     alert('Failed to initiate payment');
            // }
        } catch (error) {
            console.error('Error:', error);
            alert('Error processing payment or storing data');
        } finally {
            // Reset form and refresh page
            document.getElementById('kit-payment-form').reset();
            location.reload();
        }
    });
});
