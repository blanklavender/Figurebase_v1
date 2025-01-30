// Directing user to stripe payment portal

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Figure Base Subscription',
                        },
                        unit_amount: 1000, // $10.00 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/pages/success.html`,
            cancel_url: `${req.headers.origin}/pages/cancel.html`,
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
